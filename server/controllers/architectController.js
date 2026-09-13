import Architect from "../models/Architect.js";
import { isDbConnected } from "../config/db.js";

// Default seed fallback for architects
export const DEFAULT_ARCHITECTS = [
  {
    _id: "arch-1",
    name: "Elena Rostova",
    role: "Principal Interior Architect & Spatial Planner",
    experience: 12,
    rating: 4.96,
    reviewsCount: 98,
    dayRate: 5500,
    location: "Mumbai & NCR",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Constraint Solving", "Vastu & Code Norms", "Structural Adjacencies", "CAD Feasibility"],
    recentProject: "Duplex Space Expansion & Lightwell, Bandra West",
    bio: "Certified interior architect focused on maximizing usable volume and daylight in compact urban homes.",
    contactEmail: "elena@auraspaces.com",
    contactPhone: "+91 22 4910 8201",
  },
  {
    _id: "arch-2",
    name: "Aarav Deshmukh",
    role: "Chief Sustainable Architect & Modular Specialist",
    experience: 15,
    rating: 4.98,
    reviewsCount: 114,
    dayRate: 6000,
    location: "Bangalore & Hyderabad",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Biophilic Architecture", "Acoustic Attenuation", "Passive Cooling", "Turnkey Planning"],
    recentProject: "Net-Zero Courtyard Villa, Whitefield",
    bio: "Pioneering daylight harvesting and zero-loss spatial circulation for luxury residential developments.",
    contactEmail: "aarav@auraspaces.com",
    contactPhone: "+91 80 4961 8202",
  },
];

/**
 * @desc    Get list of all certified architects
 * @route   GET /api/architects
 * @access  Public
 */
export const getArchitects = async (req, res) => {
  try {
    const { location, search } = req.query;

    if (!isDbConnected()) {
      let filtered = [...DEFAULT_ARCHITECTS];
      if (location) {
        filtered = filtered.filter((a) =>
          a.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      if (search) {
        filtered = filtered.filter(
          (a) =>
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.role.toLowerCase().includes(search.toLowerCase())
        );
      }
      return res.json({ success: true, count: filtered.length, architects: filtered });
    }

    const query = {};
    if (location) query.location = { $regex: location, $options: "i" };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { specialties: { $in: [new RegExp(search, "i")] } },
      ];
    }

    let architects = await Architect.find(query).sort({ rating: -1 });

    if (architects.length === 0) {
      architects = DEFAULT_ARCHITECTS;
    }

    res.json({
      success: true,
      count: architects.length,
      architects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get architect by ID
 * @route   GET /api/architects/:id
 * @access  Public
 */
export const getArchitectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDbConnected()) {
      const architect = DEFAULT_ARCHITECTS.find((a) => a._id === id || a.name === id);
      if (!architect) return res.status(404).json({ success: false, message: "Architect not found." });
      return res.json({ success: true, architect });
    }

    const architect = await Architect.findById(id);
    if (!architect) {
      const fallback = DEFAULT_ARCHITECTS.find((a) => a._id === id);
      if (fallback) return res.json({ success: true, architect: fallback });
      return res.status(404).json({ success: false, message: "Architect not found." });
    }

    res.json({ success: true, architect });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default { getArchitects, getArchitectById, DEFAULT_ARCHITECTS };
