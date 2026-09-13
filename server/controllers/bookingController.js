import Booking from "../models/Booking.js";
import { isDbConnected } from "../config/db.js";

let memoryBookings = [];

/**
 * @desc    Create new architect/specialist consultation booking
 * @route   POST /api/bookings
 * @access  Public / Optional Auth
 */
export const createBooking = async (req, res) => {
  try {
    const {
      clientName,
      clientPhone,
      clientEmail,
      workerId,
      workerName,
      workerRole,
      workerCategory,
      days,
      dayRate,
      scopeContext,
      notes,
    } = req.body;

    if (!clientName || !clientPhone || !workerId) {
      return res.status(400).json({
        success: false,
        message: "clientName, clientPhone, and workerId are required fields.",
      });
    }

    const calculatedDays = Number(days) || 1;
    const rate = Number(dayRate) || 3500;
    const totalCost = calculatedDays * rate;
    const bookingRef = `AURA-IN-${Math.floor(100000 + Math.random() * 900000)}`;
    const userId = req.user?.uid || req.body.userId || "anonymous";

    const bookingData = {
      bookingRef,
      userId,
      clientName,
      clientPhone,
      clientEmail: clientEmail || "",
      workerId,
      workerName: workerName || "AURA In-House Specialist",
      workerRole: workerRole || "Lead Craftsman",
      workerCategory: workerCategory || "Architect",
      days: calculatedDays,
      dayRate: rate,
      totalCost,
      scopeContext: scopeContext || "Space Planning & Interior Consultation",
      status: "Confirmed",
      scheduledDate: new Date(),
      notes: notes || "",
    };

    if (!isDbConnected()) {
      const memoryBooking = {
        _id: `book-${Date.now()}`,
        ...bookingData,
        createdAt: new Date(),
      };
      memoryBookings.unshift(memoryBooking);
      return res.status(201).json({
        success: true,
        message: "Consultation booked successfully (in-memory mode).",
        booking: memoryBooking,
      });
    }

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      success: true,
      message: "Consultation booked successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create consultation booking.",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all bookings (with optional filter by userId or clientPhone)
 * @route   GET /api/bookings
 * @access  Optional Auth
 */
export const getBookings = async (req, res) => {
  try {
    const userId = req.user?.uid || req.query.userId;
    const phone = req.query.phone;

    if (!isDbConnected()) {
      let filtered = [...memoryBookings];
      if (userId && userId !== "anonymous") {
        filtered = filtered.filter((b) => b.userId === userId);
      }
      if (phone) {
        filtered = filtered.filter((b) => b.clientPhone === phone);
      }
      return res.json({ success: true, count: filtered.length, bookings: filtered });
    }

    const query = {};
    if (userId) query.userId = userId;
    if (phone) query.clientPhone = phone;

    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get booking by reference or ID
 * @route   GET /api/bookings/:id
 * @access  Public
 */
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDbConnected()) {
      const booking = memoryBookings.find((b) => b._id === id || b.bookingRef === id);
      if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });
      return res.json({ success: true, booking });
    }

    const booking = await Booking.findOne({
      $or: [{ bookingRef: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : undefined }],
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found." });
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update consultation status
 * @route   PATCH /api/bookings/:id/status
 * @access  Private / Admin
 */
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isDbConnected()) {
      const b = memoryBookings.find((item) => item._id === id || item.bookingRef === id);
      if (!b) return res.status(404).json({ success: false, message: "Booking not found." });
      b.status = status || b.status;
      return res.json({ success: true, message: "Status updated.", booking: b });
    }

    const booking = await Booking.findOneAndUpdate(
      { $or: [{ bookingRef: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : undefined }] },
      { $set: { status } },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found." });
    }

    res.json({ success: true, message: "Booking status updated.", booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
};
