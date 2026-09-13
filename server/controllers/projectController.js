import SavedProject from "../models/SavedProject.js";
import { isDbConnected } from "../config/db.js";

let memoryProjects = [];

/**
 * @desc    Save an AI Interior Project
 * @route   POST /api/projects
 * @access  Optional Auth
 */
export const saveProject = async (req, res) => {
  try {
    const userId = req.user?.uid || req.body.userId || "anonymous-client";
    const {
      title,
      roomType,
      style,
      dimensions,
      budgetTier,
      userNotes,
      enhancedPrompt,
      designSummary,
      imageUrl,
      productMarkers,
      blueprintModifications,
      redesignedRooms,
      totalSqFtGained,
    } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "imageUrl is required to save an AI Interior Project.",
      });
    }

    const projectData = {
      userId,
      title: title || `${style || "Modern"} ${roomType || "Living Room"} Concept`,
      roomType: roomType || "Living Room",
      style: style || "Modern",
      dimensions: dimensions || "16ft × 14ft",
      budgetTier: budgetTier || "₹18-25 Lakhs",
      userNotes: userNotes || "",
      enhancedPrompt: enhancedPrompt || "",
      designSummary: designSummary || "",
      imageUrl,
      productMarkers: productMarkers || [],
      blueprintModifications: blueprintModifications || [],
      redesignedRooms: redesignedRooms || [],
      totalSqFtGained: totalSqFtGained || "",
    };

    if (!isDbConnected()) {
      const memoryItem = {
        _id: `proj-${Date.now()}`,
        ...projectData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryProjects.unshift(memoryItem);
      return res.status(201).json({
        success: true,
        message: "Project saved (in-memory mode).",
        project: memoryItem,
      });
    }

    const project = await SavedProject.create(projectData);

    res.status(201).json({
      success: true,
      message: "AI Interior Project saved successfully.",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save interior project.",
      error: error.message,
    });
  }
};

/**
 * @desc    Fetch all saved AI Interior Projects for user
 * @route   GET /api/projects
 * @access  Optional Auth
 */
export const getProjects = async (req, res) => {
  try {
    const userId = req.user?.uid || req.query.userId;

    if (!isDbConnected()) {
      const filtered = userId
        ? memoryProjects.filter((p) => p.userId === userId || p.userId === "anonymous-client")
        : memoryProjects;
      return res.json({ success: true, count: filtered.length, projects: filtered });
    }

    const filter = userId ? { userId: { $in: [userId, "anonymous-client"] } } : {};
    const projects = await SavedProject.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get project by ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDbConnected()) {
      const p = memoryProjects.find((item) => item._id === id);
      if (!p) return res.status(404).json({ success: false, message: "Project not found." });
      return res.json({ success: true, project: p });
    }

    const project = await SavedProject.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Optional Auth
 */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!isDbConnected()) {
      const idx = memoryProjects.findIndex((item) => item._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: "Project not found." });
      memoryProjects[idx] = { ...memoryProjects[idx], ...updates, updatedAt: new Date() };
      return res.json({ success: true, message: "Project updated.", project: memoryProjects[idx] });
    }

    const project = await SavedProject.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.json({ success: true, message: "Project updated.", project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Optional Auth
 */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDbConnected()) {
      memoryProjects = memoryProjects.filter((item) => item._id !== id);
      return res.json({ success: true, message: "Project deleted." });
    }

    const project = await SavedProject.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  saveProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
