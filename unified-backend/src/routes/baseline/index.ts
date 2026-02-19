import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userSessionsRouter from "./userSessions.js";
import valueEvolutionRouter from "./valueEvolution.js";
import apaReorderingsRouter from "./apaReorderings.js";
import finalDecisionsRouter from "./finalDecisions.js";
import sessionMetricsRouter from "./sessionMetrics.js";
import sessionFeedbackRouter from "./sessionFeedback.js";
import valueStabilityRouter from "./valueStability.js";
import scenarioInteractionsRouter from "./scenarioInteractions.js";
import baselineValuesRouter from "./baselineValues.js";
import cvrResponsesRouter from "./cvrResponses.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const BASE_PATH = "/VRDS_BASELINE";
const NODE_ENV = process.env.NODE_ENV || "development";

router.get("/api/health", (_req, res) => {
  res.json({
    message: "BASELINE Experiment API",
    experiment: "BASELINE",
    base: `${BASE_PATH}/api`,
    env: NODE_ENV
  });
});

router.use("/api/user-sessions", userSessionsRouter);
router.use("/api/value-evolution", valueEvolutionRouter);
router.use("/api/apa-reorderings", apaReorderingsRouter);
router.use("/api/final-decisions", finalDecisionsRouter);
router.use("/api/session-metrics", sessionMetricsRouter);
router.use("/api/session-feedback", sessionFeedbackRouter);
router.use("/api/value-stability", valueStabilityRouter);
router.use("/api/scenario-interactions", scenarioInteractionsRouter);
router.use("/api/baseline-values", baselineValuesRouter);
router.use("/api/cvr-responses", cvrResponsesRouter);

if (NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "..", "..", "..", "public", "baseline");
  router.use(express.static(distPath));

  router.get("/*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

export default router;
