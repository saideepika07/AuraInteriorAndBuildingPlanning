import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Worker from "../models/Worker.js";
import Architect from "../models/Architect.js";
import HousePlan from "../models/HousePlan.js";
import { DEFAULT_WORKERS } from "../controllers/workerController.js";
import { DEFAULT_ARCHITECTS } from "../controllers/architectController.js";

dotenv.config();

const seedDatabase = async () => {
  console.log("Seeding AURA Spaces Database...");

  const conn = await connectDB();
  if (!conn) {
    console.log("! MongoDB is not currently available. Set MONGO_URI in server/.env to seed to Atlas.");
    process.exit(0);
  }

  try {
    // 1. Seed Workers
    await Worker.deleteMany({});
    const createdWorkers = await Worker.insertMany(DEFAULT_WORKERS);
    console.log(`✓ Seeded ${createdWorkers.length} verified trade specialists.`);

    // 2. Seed Architects
    await Architect.deleteMany({});
    const createdArchitects = await Architect.insertMany(DEFAULT_ARCHITECTS);
    console.log(`✓ Seeded ${createdArchitects.length} certified spatial architects.`);

    // 3. Seed Sample House Plan
    const samplePlanCount = await HousePlan.countDocuments();
    if (samplePlanCount === 0) {
      await HousePlan.create({
        userId: "seed-master-architect",
        title: "Signature Japandi Minimalist Courtyard (G+1)",
        inputs: {
          width: "35",
          depth: "45",
          budget: "₹35 - 45 Lakhs",
          budgetLakhs: 40,
          floors: "2 Floors (G+1)",
          familySize: "4 Members",
          style: "Japandi",
          region: "Bangalore (High Cost)",
          facing: "East",
          parking: "1 Car + 2 Bikes",
          roomPriorities: ["Living Room", "Modular Kitchen", "Primary Bedroom", "Courtyard Pooja"],
        },
        totalSqFt: 1575,
        rooms: [
          {
            id: "r1",
            label: "Courtyard Living & Tea Pavilion",
            dimensions: "18' × 14'",
            sqFt: 252,
            x: 20,
            y: 20,
            w: 220,
            h: 160,
            color: "#F5F2EB",
            recommendedTrade: "Master Modular Carpenter",
            lightRating: "High",
          },
          {
            id: "r2",
            label: "Open Minimalist Kitchen & Island",
            dimensions: "14' × 10'",
            sqFt: 140,
            x: 250,
            y: 20,
            w: 180,
            h: 120,
            color: "#FAF8F5",
            recommendedTrade: "Turnkey Civil Contractor",
            lightRating: "Medium",
          },
          {
            id: "r3",
            label: "Primary Suite with Lightwell",
            dimensions: "16' × 13'",
            sqFt: 208,
            x: 20,
            y: 190,
            w: 200,
            h: 140,
            color: "#EFF6FF",
            recommendedTrade: "Master Modular Carpenter",
            lightRating: "High",
          },
        ],
        auditResult: {
          overallScore: 94,
          circulationRating: "Optimal",
          structuralInsights: [
            "Central open lightwell maximizes natural ventilation through living and kitchen zones.",
            "Consolidated plumbing core reduces wet-wall runs by 28%.",
          ],
          costOptimizationTips: [
            "Drywall pocket doors preserve 38 sq ft of floor clearance across bedrooms.",
          ],
          recommendedTrades: [
            { trade: "Master Modular Carpenter", reason: "For zero-clearance bespoke cabinetry" },
            { trade: "Turnkey Civil Contractor", reason: "For load-bearing lightwell framing" },
          ],
          vastuNotes: "Entrance positioned favorably along East axis for dominant morning sunlight.",
        },
      });
      console.log("✓ Seeded sample Japandi House Plan.");
    }

    console.log(" Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("! Database seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
