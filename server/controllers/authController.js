import User from "../models/User.js";
import { isDbConnected } from "../config/db.js";

// In-memory fallback cache for development when MongoDB is offline
const memoryUsers = new Map();

/**
 * @desc    Sync or register Firebase user with MongoDB
 * @route   POST /api/auth/sync
 * @access  Public / Authenticated
 */
export const syncUser = async (req, res) => {
  try {
    const { firebaseUid, email, displayName, photoURL, phoneNumber } = req.body;

    if (!firebaseUid || !email) {
      return res.status(400).json({
        success: false,
        message: "firebaseUid and email are required.",
      });
    }

    if (!isDbConnected()) {
      const user = {
        firebaseUid,
        email,
        displayName: displayName || "AURA Client",
        photoURL: photoURL || "",
        phoneNumber: phoneNumber || "",
        role: "client",
        createdAt: new Date(),
      };
      memoryUsers.set(firebaseUid, user);
      return res.json({
        success: true,
        message: "User synced (in-memory mode).",
        user,
      });
    }

    let user = await User.findOne({ firebaseUid });

    if (!user) {
      user = await User.create({
        firebaseUid,
        email,
        displayName: displayName || email.split("@")[0],
        photoURL: photoURL || "",
        phoneNumber: phoneNumber || "",
      });
    } else {
      user.displayName = displayName || user.displayName;
      user.photoURL = photoURL || user.photoURL;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      await user.save();
    }

    res.json({
      success: true,
      message: "User synced successfully.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error syncing user profile.",
      error: error.message,
    });
  }
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res) => {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    if (!isDbConnected()) {
      const user = memoryUsers.get(uid) || {
        firebaseUid: uid,
        email: req.user?.email || "client@auraspaces.com",
        displayName: "AURA Client",
        role: "client",
      };
      return res.json({ success: true, user });
    }

    const user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      return res.status(404).json({ success: false, message: "User profile not found." });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update user preferences & details
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = async (req, res) => {
  try {
    const uid = req.user?.uid;
    const { displayName, phoneNumber, city, preferences } = req.body;

    if (!isDbConnected()) {
      const user = memoryUsers.get(uid) || { firebaseUid: uid };
      Object.assign(user, { displayName, phoneNumber, city, preferences });
      memoryUsers.set(uid, user);
      return res.json({ success: true, message: "Profile updated (in-memory mode).", user });
    }

    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      { $set: { displayName, phoneNumber, city, preferences } },
      { new: true, upsert: true }
    );

    res.json({ success: true, message: "Profile updated.", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default { syncUser, getMe, updateProfile };
