import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    w: { type: Number, required: true },
    h: { type: Number, required: true },
    color: { type: String, default: "#EFECE6" },
    dimensions: { type: String, default: "14' × 12'" },
    sqFt: { type: Number, default: 168 },
    lightRating: { type: String, enum: ["High", "Medium", "Soft"], default: "Medium" },
    recommendedFurniture: [{ type: String }],
    paintHex: { type: String, default: "#F4F3EF" },
    paintName: { type: String, default: "Alabaster Mineral" },
    recommendedTrade: { type: String, default: "Master Modular Carpenter" },
    type: { type: String, default: "living" },
  },
  { _id: false }
);

const housePlanSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: "Bespoke Architectural Floor Plan",
    },
    inputs: {
      width: { type: String, default: "30" },
      depth: { type: String, default: "40" },
      budget: { type: String, default: "₹25 - 35 Lakhs" },
      budgetLakhs: { type: Number, default: 30 },
      floors: { type: String, default: "2 Floors (G+1)" },
      familySize: { type: String, default: "4 Members" },
      style: {
        type: String,
        enum: ["Modern", "Luxury", "Traditional", "Minimalist", "Japandi", "Boho Chic"],
        default: "Modern",
      },
      region: { type: String, default: "Bangalore (High Cost)" },
      facing: {
        type: String,
        enum: ["North", "East", "South", "West"],
        default: "East",
      },
      parking: {
        type: String,
        default: "1 Car + 2 Bikes",
      },
      bhk: {
        type: String,
        default: "2 BHK",
      },
      roomPriorities: [{ type: String }],
    },
    rooms: [roomSchema],
    totalSqFt: {
      type: Number,
      default: 1200,
    },
    auditResult: {
      overallScore: { type: Number, default: 90 },
      circulationRating: { type: String, default: "Optimal" },
      structuralInsights: [{ type: String }],
      costOptimizationTips: [{ type: String }],
      recommendedTrades: [
        {
          trade: { type: String },
          reason: { type: String },
        },
      ],
      vastuNotes: { type: String },
    },
    blueprintImageUrl: {
      type: String,
      default: "",
    },
    svgContent: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "finalized", "under-review"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

export const HousePlan = mongoose.model("HousePlan", housePlanSchema);
export default HousePlan;
