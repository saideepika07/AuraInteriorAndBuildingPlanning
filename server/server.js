import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { initFirebase } from "./config/firebase.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import housePlanRoutes from "./routes/housePlanRoutes.js";
import architectRoutes from "./routes/architectRoutes.js";
import workerRoutes from "./routes/workerRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Databases and Cloud Services
connectDB();
initFirebase();

// Standard Middlewares
const allowedOrigins = [
  "http://localhost:8443",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:8443",
  "http://127.0.0.1:5173",
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl) or matched origins
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev to avoid CORS friction
      }
    },
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// API Root Gateway & Health Check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    platform: "AURA Spaces MERN + Firebase API Gateway",
    status: "operational",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: "/api/auth",
      housePlans: "/api/plans",
      architects: "/api/architects",
      workers: "/api/workers",
      bookings: "/api/bookings",
      projects: "/api/projects",
      ai: "/api/ai",
      upload: "/api/upload",
    },
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/plans", housePlanRoutes);
app.use("/api/architects", architectRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/upload", uploadRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`✦ AURA Spaces Express REST API Server running on port ${PORT}`);
  console.log(`✦ Health check: http://localhost:${PORT}/api/health`);
  console.log(`✦ Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`=======================================================`);
});

export default app;
