import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDatabase } from "./config/database.js";
import userSessionsRouter from "./routes/userSessions.js";
import valueEvolutionRouter from "./routes/valueEvolution.js";
import apaReorderingsRouter from "./routes/apaReorderings.js";
import finalDecisionsRouter from "./routes/finalDecisions.js";
import sessionMetricsRouter from "./routes/sessionMetrics.js";
import sessionFeedbackRouter from "./routes/sessionFeedback.js";
import valueStabilityRouter from "./routes/valueStability.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
const PORT = Number(process.env.PORT || 4001);
const NODE_ENV = process.env.NODE_ENV || "development";
const BASE_PATH = "/VRDS_CVR_APA";

// CORS Configuration
// In production, configure this to only allow your actual domain
app.use(cors({
  origin: NODE_ENV === "production"
    ? ["https://moonlander.fit.edu", "http://moonlander.fit.edu"]
    : ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));

// Security headers for production
if (NODE_ENV === "production") {
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });
}

app.use(express.json({ limit: "10mb" }));

// Health check endpoint (important for monitoring)
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes under /VRDS_CVR_APA/api/*
app.use(`${BASE_PATH}/api/user-sessions`, userSessionsRouter);
app.use(`${BASE_PATH}/api/value-evolution`, valueEvolutionRouter);
app.use(`${BASE_PATH}/api/apa-reorderings`, apaReorderingsRouter);
app.use(`${BASE_PATH}/api/final-decisions`, finalDecisionsRouter);
app.use(`${BASE_PATH}/api/session-metrics`, sessionMetricsRouter);
app.use(`${BASE_PATH}/api/session-feedback`, sessionFeedbackRouter);
app.use(`${BASE_PATH}/api/value-stability`, valueStabilityRouter);

// Serve static files from the React app build (dist folder)
// This assumes the dist folder is at the root of the project
const distPath = path.resolve(__dirname, "..", "..", "dist");
app.use(BASE_PATH, express.static(distPath));

// SPA fallback: All non-API routes under /my_experiment should return index.html
app.get(`${BASE_PATH}/*`, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Root endpoint for info
app.get("/", (_req, res) => {
  res.json({
    message: "Wildfire Study API",
    endpoints: {
      app: `${BASE_PATH}/`,
      api: `${BASE_PATH}/api`,
      health: "/health"
    }
  });
});

async function start() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${NODE_ENV} mode`);
    console.log(`📡 API available at http://localhost:${PORT}${BASE_PATH}/api`);
    console.log(`🌐 Web app available at http://localhost:${PORT}${BASE_PATH}`);
    console.log(`💚 Health check at http://localhost:${PORT}/health`);
  });
}

start();
