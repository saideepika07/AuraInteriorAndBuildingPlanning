import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadBlueprint, uploadInteriorImage } from "../controllers/uploadController.js";
import { optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/blueprint", optionalAuth, upload.single("file"), uploadBlueprint);
router.post("/interior", optionalAuth, upload.single("file"), uploadInteriorImage);

export default router;
