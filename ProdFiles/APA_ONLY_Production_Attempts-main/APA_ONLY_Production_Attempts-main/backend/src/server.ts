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
import baselineValuesRouter from "./routes/baselineValues.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
const PORT = Number(process.env.PORT || 4003);
const BASE_PATH = "/VRDS_APA";
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(cors({
  origin: NODE_ENV === "production"
    ? ["https://moonlander.fit.edu", "http://moonlander.fit.edu"]
    : ["http://localhost:3003", "http://localhost:5173", "http://127.0.0.1:3003", "http://127.0.0.1:5173"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));

app.get(`${BASE_PATH}/health`, (_req, res) => {
  res.json({ status: "ok", message: "VRDS_APA API", base: `${BASE_PATH}/api` });
});

app.use(`${BASE_PATH}/api/user-sessions`, userSessionsRouter);
app.use(`${BASE_PATH}/api/value-evolution`, valueEvolutionRouter);
app.use(`${BASE_PATH}/api/apa-reorderings`, apaReorderingsRouter);
app.use(`${BASE_PATH}/api/final-decisions`, finalDecisionsRouter);
app.use(`${BASE_PATH}/api/session-metrics`, sessionMetricsRouter);
app.use(`${BASE_PATH}/api/session-feedback`, sessionFeedbackRouter);
app.use(`${BASE_PATH}/api/value-stability`, valueStabilityRouter);
app.use(`${BASE_PATH}/api/baseline-values`, baselineValuesRouter);

if (NODE_ENV === "production") {
  const frontendDistPath = path.resolve(__dirname, "..", "..", "dist");
  app.use(`${BASE_PATH}`, express.static(frontendDistPath));

  app.get(`${BASE_PATH}/*`, (_req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

async function start() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 VRDS_APA API on http://localhost:${PORT}${BASE_PATH}`);
    console.log(`Environment: ${NODE_ENV}`);
    if (NODE_ENV === "production") {
      console.log(`Serving static files from: ${path.resolve(__dirname, "..", "..", "dist")}`);
    }
  });
}

start();
