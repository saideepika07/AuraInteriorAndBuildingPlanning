import express from "express";
import {
  createHousePlan,
  getHousePlans,
  getHousePlanById,
  updateHousePlan,
  deleteHousePlan,
} from "../controllers/housePlanController.js";
import { optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(optionalAuth, createHousePlan)
  .get(optionalAuth, getHousePlans);

router.route("/:id")
  .get(getHousePlanById)
  .put(optionalAuth, updateHousePlan)
  .delete(optionalAuth, deleteHousePlan);

export default router;
