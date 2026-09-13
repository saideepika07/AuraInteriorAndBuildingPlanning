import express from "express";
import {
  analyzeRoom,
  enhancePrompt,
  auditFloorPlan,
} from "../controllers/aiController.js";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "AURA Gemini Spatial AI Gateway",
    status: "online",
    models: ["gemini-3.6-flash", "gemini-flash-latest"],
    timestamp: new Date().toISOString(),
  });
});

router.post("/analyze-room", analyzeRoom);
router.post("/enhance-prompt", enhancePrompt);
router.post("/audit-floorplan", auditFloorPlan);

export default router;
