import express from "express";

const router = express.Router();
const BASE_PATH = "/VRDS_APA";

router.get("/api/health", (_req, res) => {
  res.json({
    message: "APA_ONLY Experiment API (Coming Soon)",
    experiment: "APA_ONLY",
    base: `${BASE_PATH}/api`,
    status: "inactive"
  });
});

router.get("/*", (_req, res) => {
  res.status(503).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>APA_ONLY Experiment - Coming Soon</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .container {
          text-align: center;
          padding: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>APA_ONLY Experiment</h1>
        <p>This experiment is currently inactive and will be available soon.</p>
        <p><a href="/" style="color: white;">Return to Home</a></p>
      </div>
    </body>
    </html>
  `);
});

export default router;
