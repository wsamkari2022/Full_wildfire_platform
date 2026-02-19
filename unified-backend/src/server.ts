import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDatabase } from "./config/database.js";
import { experimentLogger } from "./middleware/experimentLogger.js";

import cvrApaRoutes from "./routes/cvr_apa/index.js";
import cvrOnlyRoutes from "./routes/cvr_only/index.js";
import apaOnlyRoutes from "./routes/apa_only/index.js";
import baselineRoutes from "./routes/baseline/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
const PORT = Number(process.env.PORT || 4000);
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(cors({
  origin: NODE_ENV === "production"
    ? ["https://moonlander.fit.edu", "http://moonlander.fit.edu"]
    : ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:4000", "http://127.0.0.1:5173", "http://127.0.0.1:4000"],
  credentials: true
}));

if (NODE_ENV === "production") {
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });
}

app.use(express.json({ limit: "10mb" }));
app.use(experimentLogger);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), port: PORT });
});

app.get("/api/experiments", (_req, res) => {
  res.json({
    experiments: [
      { name: "CVR_APA", path: "/VRDS_CVR_APA", active: true },
      { name: "CVR_ONLY", path: "/VRDS_CVR", active: true },
      { name: "APA_ONLY", path: "/VRDS_APA", active: true },
      { name: "BASELINE", path: "/VRDS_BASELINE", active: true }
    ],
    port: PORT
  });
});

app.use("/VRDS_CVR_APA", cvrApaRoutes);
app.use("/VRDS_CVR", cvrOnlyRoutes);
app.use("/VRDS_APA", apaOnlyRoutes);
app.use("/VRDS_BASELINE", baselineRoutes);

const landingHTML = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Human-AI Collaboration Study</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="cache-control" content="no-store" />
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', system-ui, -apple-system, Roboto, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      background: #000;
    }

    .aurora-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      background: #000;
    }

    .aurora-layer {
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
    }

    .aurora-layer-1 {
      background: radial-gradient(ellipse at 20% 30%, rgba(138, 43, 226, 0.4) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 70%, rgba(25, 25, 112, 0.5) 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 50%, rgba(128, 0, 32, 0.3) 0%, transparent 50%);
      animation: aurora-flow-1 30s ease-in-out infinite;
      opacity: 0.8;
    }

    .aurora-layer-2 {
      background: radial-gradient(ellipse at 60% 20%, rgba(65, 105, 225, 0.4) 0%, transparent 50%),
                  radial-gradient(ellipse at 30% 80%, rgba(128, 0, 128, 0.3) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 60%, rgba(75, 0, 130, 0.4) 0%, transparent 50%);
      animation: aurora-flow-2 35s ease-in-out infinite;
      opacity: 0.7;
    }

    .aurora-layer-3 {
      background: radial-gradient(ellipse at 40% 60%, rgba(0, 0, 139, 0.5) 0%, transparent 50%),
                  radial-gradient(ellipse at 90% 40%, rgba(139, 0, 0, 0.3) 0%, transparent 50%),
                  radial-gradient(ellipse at 10% 90%, rgba(72, 61, 139, 0.4) 0%, transparent 50%);
      animation: aurora-flow-3 40s ease-in-out infinite;
      opacity: 0.6;
    }

    @keyframes aurora-flow-1 {
      0%, 100% {
        transform: translate(0%, 0%) rotate(0deg) scale(1);
      }
      33% {
        transform: translate(-10%, 10%) rotate(120deg) scale(1.1);
      }
      66% {
        transform: translate(10%, -10%) rotate(240deg) scale(0.9);
      }
    }

    @keyframes aurora-flow-2 {
      0%, 100% {
        transform: translate(0%, 0%) rotate(0deg) scale(1);
      }
      33% {
        transform: translate(15%, -5%) rotate(-120deg) scale(1.15);
      }
      66% {
        transform: translate(-15%, 15%) rotate(-240deg) scale(0.95);
      }
    }

    @keyframes aurora-flow-3 {
      0%, 100% {
        transform: translate(0%, 0%) rotate(0deg) scale(1);
      }
      50% {
        transform: translate(5%, 20%) rotate(180deg) scale(1.2);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes shimmer {
      0%, 100% {
        box-shadow: 0 0 30px rgba(138, 43, 226, 0.3),
                    0 0 60px rgba(25, 25, 112, 0.2),
                    inset 0 0 40px rgba(255, 255, 255, 0.05);
      }
      50% {
        box-shadow: 0 0 40px rgba(65, 105, 225, 0.4),
                    0 0 80px rgba(128, 0, 128, 0.3),
                    inset 0 0 50px rgba(255, 255, 255, 0.08);
      }
    }

    .container {
      position: relative;
      z-index: 1;
      max-width: 800px;
      width: 90%;
      margin: 20px;
      background: rgba(15, 15, 25, 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      padding: 50px 40px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 30px rgba(138, 43, 226, 0.3),
                  0 0 60px rgba(25, 25, 112, 0.2),
                  inset 0 0 40px rgba(255, 255, 255, 0.05);
      text-align: center;
      animation: fadeIn 1s ease-out, shimmer 8s ease-in-out infinite;
    }

    h1 {
      font-size: 28px;
      font-weight: 300;
      color: #fff;
      margin-bottom: 30px;
      line-height: 1.4;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5),
                   0 0 20px rgba(138, 43, 226, 0.3);
      letter-spacing: 0.5px;
    }

    p {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.8;
      font-size: 18px;
      font-weight: 300;
      margin-bottom: 20px;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    }

    button {
      margin-top: 35px;
      padding: 16px 50px;
      font-size: 18px;
      font-weight: 400;
      border: none;
      border-radius: 50px;
      background: linear-gradient(135deg, rgba(138, 43, 226, 0.9), rgba(65, 105, 225, 0.9));
      color: white;
      cursor: pointer;
      transition: all 0.4s ease;
      box-shadow: 0 5px 20px rgba(138, 43, 226, 0.4);
      letter-spacing: 1px;
      text-transform: uppercase;
      position: relative;
      overflow: hidden;
    }

    button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    button:hover::before {
      width: 300px;
      height: 300px;
    }

    button:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 30px rgba(138, 43, 226, 0.6),
                  0 0 40px rgba(65, 105, 225, 0.4);
    }

    button:active {
      transform: translateY(0) scale(1);
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    button span {
      position: relative;
      z-index: 1;
    }

    .small {
      margin-top: 30px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 300;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    .loading {
      display: none;
      margin-top: 20px;
      color: rgba(255, 255, 255, 0.8);
      font-size: 16px;
    }

    .loading.active {
      display: block;
    }

    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-right: 8px;
      vertical-align: middle;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .container {
        padding: 40px 30px;
      }

      h1 {
        font-size: 22px;
      }

      p {
        font-size: 16px;
      }

      button {
        padding: 14px 40px;
        font-size: 16px;
      }
    }

    @media (max-width: 480px) {
      .container {
        padding: 30px 20px;
      }

      h1 {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="aurora-bg">
    <div class="aurora-layer aurora-layer-1"></div>
    <div class="aurora-layer aurora-layer-2"></div>
    <div class="aurora-layer aurora-layer-3"></div>
  </div>

  <div class="container">
    <h1>Negotiation and Cognitive Value Recontextualization for Consistency Assessment in Human-AI Collaboration: Advancing Joint Decision-Making through Adaptive Preference Alignment</h1>
    <p>
      Thank you for participating in our research study.
    </p>
    <button id="startBtn"><span>Begin Study</span></button>
    <div class="loading" id="loading">
      <div class="spinner"></div>
      <span>Preparing your study session...</span>
    </div>
    <div class="small">
      By clicking "Begin Study", you consent to participate in this research.
    </div>
  </div>

  <script>
    document.getElementById("startBtn").addEventListener("click", async () => {
      const btn = document.getElementById("startBtn");
      const loading = document.getElementById("loading");

      btn.disabled = true;
      loading.classList.add("active");

      try {
        const res = await fetch("/assign" + window.location.search);
        const data = await res.json();
        window.location.replace(data.url);
      } catch (e) {
        alert("Assignment failed. Please try again.");
        btn.disabled = false;
        loading.classList.remove("active");
      }
    });
  </script>
</body>
</html>
`;

app.get("/", (_req, res) => {
  res.send(landingHTML);
});

app.get("/landingpage", (_req, res) => {
  res.send(landingHTML);
});

app.get("/assign", (req, res) => {
  const EXPERIMENTS = [
    { path: "/VRDS_CVR_APA", name: "CVR_APA", active: true },
    { path: "/VRDS_CVR", name: "CVR_ONLY", active: true },
    { path: "/VRDS_APA", name: "APA_ONLY", active: true },
    { path: "/VRDS_BASELINE", name: "BASELINE", active: true }
  ];

  const activeExperiments = EXPERIMENTS.filter(e => e.active);
  const choice = activeExperiments[Math.floor(Math.random() * activeExperiments.length)];

  const query = req.originalUrl.includes("?")
    ? req.originalUrl.slice(req.originalUrl.indexOf("?"))
    : "";

  const finalUrl = choice.path + query;

  console.log(`[ASSIGN] ${new Date().toISOString()} ip=${req.ip} -> ${choice.name} (${finalUrl})`);

  res.json({ url: finalUrl, experiment: choice.name });
});

app.get("*", (_req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "This endpoint does not exist. Check /health or /api/experiments for available routes."
  });
});

async function start() {
  try {
    await connectDatabase();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`\n${"=".repeat(60)}`);
      console.log(`🚀 Unified VRDS Server Running`);
      console.log(`${"=".repeat(60)}`);
      console.log(`📦 Environment: ${NODE_ENV}`);
      console.log(`🌍 Port: ${PORT}`);
      console.log(`💚 Health Check: http://localhost:${PORT}/health`);
      console.log(`🏠 Landing Page: http://localhost:${PORT}/`);
      console.log(`\nActive Experiments:`);
      console.log(`  • CVR_APA:  http://localhost:${PORT}/VRDS_CVR_APA`);
      console.log(`  • CVR_ONLY: http://localhost:${PORT}/VRDS_CVR`);
      console.log(`  • APA_ONLY: http://localhost:${PORT}/VRDS_APA`);
      console.log(`  • BASELINE: http://localhost:${PORT}/VRDS_BASELINE`);
      console.log(`${"=".repeat(60)}\n`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

start();
