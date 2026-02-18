const express = require("express");
const app = express();

const PORT = 3999;

/**
 * Each experiment runs on a different PORT and base PATH.
 * We will build the redirect URL dynamically based on the host the user used
 * (localhost for local testing, moonlander.fit.edu for real users).
 */
const EXPERIMENTS = [
  { port: 4001, path: "/VRDS_CVR_APA" },
  { port: 4002, path: "/VRDS_CVR" },
  { port: 4003, path: "/VRDS_APA" },
  { port: 4004, path: "/VRDS_BASELINE" },
];

// ---------------- Landing Page (Frontend) ----------------
app.get("/landingpage", (req, res) => {
  res.send(`
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>VRDS Study</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="cache-control" content="no-store" />
  <style>
    body {
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      background: #f7f9fc;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 720px;
      margin: 80px auto;
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      text-align: center;
    }
    h1 { margin-bottom: 10px; }
    p { color: #555; line-height: 1.6; }
    button {
      margin-top: 30px;
      padding: 14px 26px;
      font-size: 18px;
      border: none;
      border-radius: 8px;
      background: #2563eb;
      color: white;
      cursor: pointer;
    }
    button:hover { background: #1e4fd7; }
    .small { margin-top: 20px; font-size: 14px; color: #777; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to the Study V2</h1>
    <p>
      Thank you for your interest in participating in this research study.
      You will be randomly assigned to one version of the study.
    </p>
    <p>
      Please complete the study in one sitting and avoid refreshing the page once started.
    </p>
    <button id="startBtn">Start Study</button>
    <div class="small">
      By clicking "Start Study", you consent to participate in this research.
    </div>
  </div>

  <script>
    document.getElementById("startBtn").addEventListener("click", async () => {
      try {
        const res = await fetch("/assign" + window.location.search);
        const data = await res.json();
        window.location.replace(data.url);
      } catch (e) {
        alert("Assignment failed. Please try again.");
      }
    });
  </script>
</body>
</html>
  `);
});

// ---------------- Assignment Endpoint (Dynamic Host) ----------------
app.get("/assign", (req, res) => {
  const choice = EXPERIMENTS[Math.floor(Math.random() * EXPERIMENTS.length)];

  // The host the user used to reach this landing server (e.g., moonlander.fit.edu or localhost)
  // req.headers.host may include ":3999" so we strip the port.
  const host = (req.headers.host || "localhost").split(":")[0];

  // IMPORTANT:
  // This landing server is plain HTTP (not HTTPS) unless you have a reverse proxy doing TLS.
  // So we use http:// here.
  const baseUrl = `http://${host}:${choice.port}${choice.path}`;

  // Preserve query parameters (e.g. ?PROLIFIC_PID=... or ?participant=...)
  const query = req.originalUrl.includes("?")
    ? req.originalUrl.slice(req.originalUrl.indexOf("?"))
    : "";

  const finalUrl = baseUrl + query;

  console.log(`[LANDING] ${new Date().toISOString()} ip=${req.ip} host=${host} -> ${finalUrl}`);

  res.json({ url: finalUrl });
});

// ---------------- Health Check ----------------
app.get("/health", (_, res) => res.send("OK"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`?? Landing page running at http://localhost:${PORT}/landingpage`);
  console.log(`   External (example): http://moonlander.fit.edu:${PORT}/landingpage`);
});