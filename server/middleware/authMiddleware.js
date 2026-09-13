import admin from "firebase-admin";
import { isFirebaseReady } from "../config/firebase.js";
import User from "../models/User.js";

/**
 * Required Firebase Authentication Middleware
 * Checks Authorization header for valid Firebase ID Token
 */
export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing. Please sign in.",
    });
  }

  const token = authHeader.split("Bearer ")[1];

  // If Firebase Admin is not initialized with live credentials, support dev mock tokens
  if (!isFirebaseReady()) {
    try {
      // Decode basic payload or use mock dev user
      req.user = {
        uid: req.headers["x-dev-uid"] || "dev-client-uid-1001",
        email: req.headers["x-dev-email"] || "deepika.aura@auraspaces.com",
        name: "Deepika (Dev Mode)",
      };
      return next();
    } catch {
      return res.status(401).json({ success: false, message: "Invalid development token." });
    }
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;

    // Optional: Attach or create MongoDB user profile
    try {
      const dbUser = await User.findOne({ firebaseUid: decodedToken.uid });
      if (dbUser) req.dbUser = dbUser;
    } catch {
      // Non-blocking if DB query fails
    }

    next();
  } catch (error) {
    console.error("Firebase token verification failed:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authorization token.",
      error: error.message,
    });
  }
};

/**
 * Optional Authentication Middleware
 * Attaches user if valid token exists, otherwise proceeds as guest
 */
export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split("Bearer ")[1];

  if (!isFirebaseReady()) {
    req.user = {
      uid: req.headers["x-dev-uid"] || "guest-client",
      email: req.headers["x-dev-email"] || "guest@auraspaces.com",
    };
    return next();
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
  } catch {
    req.user = null;
  }

  next();
};

export default { requireAuth, optionalAuth };
