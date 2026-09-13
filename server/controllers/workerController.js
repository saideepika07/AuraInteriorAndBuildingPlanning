import Worker from "../models/Worker.js";
import { isDbConnected } from "../config/db.js";

// Canonical in-house workforce roster matching the frontend UI exactly
export const DEFAULT_WORKERS = [
  {
    workerId: "w1",
    name: "Julian Vance",
    category: "Carpenter",
    role: "Master Architectural Joiner & Modular Cabinetmaker",
    experience: 14,
    rating: 4.98,
    reviewsCount: 142,
    dayRate: 3200,
    location: "Bangalore & Hyderabad",
    city: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1547609434-b732edfee020?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Murphy Bed Fabrication", "Fluted Oak Paneling", "Concealed Hardware", "Pocket Pantries"],
    recentProject: "Bespoke Walnut Joinery, Indiranagar Residence",
    bio: "Specializing in ultra-compact modular furniture systems and zero-clearance hidden cabinetry.",
  },
  {
    workerId: "w2",
    name: "Elena Rostova",
    category: "Architect",
    role: "Principal Interior Architect & Spatial Planner",
    experience: 12,
    rating: 4.96,
    reviewsCount: 98,
    dayRate: 5500,
    location: "Mumbai & NCR",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Constraint Solving", "Vastu & Code Norms", "Structural Adjacencies", "CAD Feasibility"],
    recentProject: "Duplex Space Expansion & Lightwell, Bandra West",
    bio: "Certified interior architect focused on maximizing usable volume and daylight in compact urban homes.",
  },
  {
    workerId: "w3",
    name: "Marcus Sterling",
    category: "Contractor",
    role: "Turnkey Civil Contractor & Construction Lead",
    experience: 18,
    rating: 4.94,
    reviewsCount: 215,
    dayRate: 4500,
    location: "Bangalore & Chennai",
    city: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Drywall Partitions", "Load-Bearing Wall Openings", "On-Time Guarantee", "Site Logistics"],
    recentProject: "Complete 3-Floor Villa Renovation, Whitefield",
    bio: "Oversees turnkey execution from civil masonry to final finishes, guaranteeing strict timeline adherence.",
  },
  {
    workerId: "w4",
    name: "Devon Chen",
    category: "Electrician",
    role: "Smart Home & Architectural Lighting Specialist",
    experience: 10,
    rating: 4.99,
    reviewsCount: 126,
    dayRate: 2800,
    location: "Hyderabad & Pune",
    city: "Hyderabad",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Magnetic Track Profiles", "Smart Scene Automation", "Concealed LED Coves", "Zero-Footprint Lighting"],
    recentProject: "Architectural Lighting Overhaul, Jubilee Hills",
    bio: "Dedicated to eliminating floor clutter through ceiling-flush magnetic profiles and mood-tuned illumination.",
  },
  {
    workerId: "w5",
    name: "Sofia Larsson",
    category: "Painter",
    role: "Lime Wash & Venetian Plaster Artist",
    experience: 9,
    rating: 4.97,
    reviewsCount: 88,
    dayRate: 2400,
    location: "Mumbai & Goa",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Microcement Floors", "Roman Clay Walls", "Matte Lime Wash", "Texture Reflection"],
    recentProject: "Wabi-Sabi Plaster Application, Alibaug Villa",
    bio: "Crafting breathable, tactile mineral wall finishes that softly diffuse natural sunlight across living spaces.",
  },
  {
    workerId: "w6",
    name: "Kavita Nair",
    category: "Ceiling",
    role: "False Ceiling & Acoustic Paneling Craftsman",
    experience: 11,
    rating: 4.95,
    reviewsCount: 104,
    dayRate: 2600,
    location: "Bangalore & Kochi",
    city: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Drop Shadowline Ceilings", "Slatted Timber Baffles", "Concealed AC Grilles", "Acoustic Attenuation"],
    recentProject: "Minimalist Acoustic Ceiling Integration, Koramangala",
    bio: "Specialist in integrating air-conditioning ducting, curtain pockets, and acoustic damping inside false ceilings.",
  },
  {
    workerId: "w7",
    name: "Vikramaditya Sharma",
    category: "Plumber",
    role: "Master Sanitary Engineer & Whole-Building Water Infrastructure Lead",
    experience: 16,
    rating: 4.98,
    reviewsCount: 182,
    dayRate: 3100,
    location: "Bangalore, Mumbai & NCR",
    city: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: [
      "Whole-Building Water Supply",
      "Overhead Tank & Sump Integration",
      "Hydro-Pneumatic Pressure Booster",
      "Concealed CPVC/PPR Piping Grid",
      "Zero-Leak Sanitary Manifolds",
      "Central Hot/Cold Recirculation Ring",
    ],
    recentProject: "Central Water Grid & Multi-Floor Plumbing Network, Prestige Golfshire",
    bio: "Specializes in end-to-end building water infrastructure: from municipal main line & borewell sump connections to overhead gravity tanks, hydro-pneumatic booster pumps, and balanced water pressure across all attached washrooms and kitchens.",
  },
  {
    workerId: "w8",
    name: "Tariq Mansoor",
    category: "Plumber",
    role: "Central Water Metering & Multi-Floor Hydraulic Lead",
    experience: 13,
    rating: 4.96,
    reviewsCount: 124,
    dayRate: 2900,
    location: "Hyderabad & Chennai",
    city: "Hyderabad",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: [
      "Municipal Main Inflow Tie-In",
      "Acoustic Cast Iron Drainage",
      "Water Softening & RO Filtration",
      "Leak-Free Wall-Hung Cisterns",
      "Rainwater Harvesting Integration",
    ],
    recentProject: "Full Duplex Pressurized Hydraulic Ring Main, Jubilee Hills",
    bio: "Master plumbing technician ensuring balanced water pressure across every floor, leak-free wall-hung cistern connections, and whole-building water safety.",
  },
];

/**
 * @desc    Get verified workers, with optional category & location filters
 * @route   GET /api/workers
 * @access  Public
 */
export const getWorkers = async (req, res) => {
  try {
    const { category, location, city, search } = req.query;

    if (!isDbConnected()) {
      let filtered = [...DEFAULT_WORKERS];
      if (category && category !== "All") {
        filtered = filtered.filter(
          (w) => w.category.toLowerCase() === category.toLowerCase()
        );
      }
      if (location || city) {
        const loc = (location || city).toLowerCase();
        filtered = filtered.filter(
          (w) =>
            w.location.toLowerCase().includes(loc) ||
            w.city.toLowerCase().includes(loc)
        );
      }
      if (search) {
        filtered = filtered.filter(
          (w) =>
            w.name.toLowerCase().includes(search.toLowerCase()) ||
            w.role.toLowerCase().includes(search.toLowerCase()) ||
            w.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()))
        );
      }
      return res.json({ success: true, count: filtered.length, workers: filtered });
    }

    const query = {};
    if (category && category !== "All") query.category = category;
    if (location || city) {
      const loc = location || city;
      query.$or = [
        { location: { $regex: loc, $options: "i" } },
        { city: { $regex: loc, $options: "i" } },
      ];
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { specialties: { $in: [new RegExp(search, "i")] } },
      ];
    }

    let workers = await Worker.find(query).sort({ rating: -1 });

    if (workers.length === 0 && (!category || category === "All") && !search) {
      workers = DEFAULT_WORKERS;
    }

    res.json({
      success: true,
      count: workers.length,
      workers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get worker by workerId or MongoDB _id
 * @route   GET /api/workers/:id
 * @access  Public
 */
export const getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDbConnected()) {
      const worker = DEFAULT_WORKERS.find(
        (w) => w.workerId === id || w.id === id || w.name.toLowerCase() === id.toLowerCase()
      );
      if (!worker) return res.status(404).json({ success: false, message: "Worker not found." });
      return res.json({ success: true, worker });
    }

    let worker = await Worker.findOne({
      $or: [{ workerId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : undefined }],
    });

    if (!worker) {
      const fallback = DEFAULT_WORKERS.find((w) => w.workerId === id);
      if (fallback) return res.json({ success: true, worker: fallback });
      return res.status(404).json({ success: false, message: "Worker not found." });
    }

    res.json({ success: true, worker });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default { getWorkers, getWorkerById, DEFAULT_WORKERS };
