import HousePlan from "../models/HousePlan.js";
import { isDbConnected } from "../config/db.js";

// In-memory store for fallback
let memoryPlans = [];

/**
 * @desc    Save a new house plan
 * @route   POST /api/plans
 * @access  Optional Auth / Public with fallback
 */
export const createHousePlan = async (req, res) => {
  try {
    const userId = req.user?.uid || req.body.userId || "anonymous-client";
    const {
      title,
      inputs,
      rooms,
      totalSqFt,
      auditResult,
      blueprintImageUrl,
      svgContent,
    } = req.body;

    if (!rooms || !Array.isArray(rooms) || rooms.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Plan must contain at least one configured room.",
      });
    }

    const planData = {
      userId,
      title: title || `Bespoke ${inputs?.style || "Modern"} ${inputs?.floors || "G+1"} Plan`,
      inputs: inputs || {},
      rooms,
      totalSqFt: totalSqFt || rooms.reduce((acc, r) => acc + (r.sqFt || 0), 0),
      auditResult: auditResult || {},
      blueprintImageUrl: blueprintImageUrl || "",
      svgContent: svgContent || "",
      status: "draft",
    };

    if (!isDbConnected()) {
      const memoryPlan = {
        _id: `plan-mem-${Date.now()}`,
        ...planData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryPlans.unshift(memoryPlan);
      return res.status(201).json({
        success: true,
        message: "House plan saved successfully (in-memory mode).",
        plan: memoryPlan,
      });
    }

    const plan = await HousePlan.create(planData);

    res.status(201).json({
      success: true,
      message: "House plan saved successfully.",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving house plan.",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all house plans for the current user
 * @route   GET /api/plans
 * @access  Optional Auth
 */
export const getHousePlans = async (req, res) => {
  try {
    const userId = req.user?.uid || req.query.userId;

    if (!isDbConnected()) {
      const filtered = userId
        ? memoryPlans.filter((p) => p.userId === userId || p.userId === "anonymous-client")
        : memoryPlans;
      return res.json({ success: true, count: filtered.length, plans: filtered });
    }

    const filter = userId ? { userId: { $in: [userId, "anonymous-client"] } } : {};
    const plans = await HousePlan.find(filter).sort({ createdAt: -1 }).limit(50);

    res.json({
      success: true,
      count: plans.length,
      plans,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get a single house plan by ID
 * @route   GET /api/plans/:id
 * @access  Public
 */
export const getHousePlanById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDbConnected()) {
      const plan = memoryPlans.find((p) => p._id === id);
      if (!plan) return res.status(404).json({ success: false, message: "Plan not found." });
      return res.json({ success: true, plan });
    }

    const plan = await HousePlan.findById(id);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found." });
    }

    res.json({ success: true, plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update a house plan
 * @route   PUT /api/plans/:id
 * @access  Optional Auth
 */
export const updateHousePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!isDbConnected()) {
      const idx = memoryPlans.findIndex((p) => p._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: "Plan not found." });
      memoryPlans[idx] = { ...memoryPlans[idx], ...updates, updatedAt: new Date() };
      return res.json({ success: true, message: "Plan updated.", plan: memoryPlans[idx] });
    }

    const plan = await HousePlan.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found." });
    }

    res.json({ success: true, message: "House plan updated.", plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete a house plan
 * @route   DELETE /api/plans/:id
 * @access  Optional Auth
 */
export const deleteHousePlan = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDbConnected()) {
      memoryPlans = memoryPlans.filter((p) => p._id !== id);
      return res.json({ success: true, message: "Plan deleted." });
    }

    const plan = await HousePlan.findByIdAndDelete(id);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found." });
    }

    res.json({ success: true, message: "House plan deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createHousePlan,
  getHousePlans,
  getHousePlanById,
  updateHousePlan,
  deleteHousePlan,
};
