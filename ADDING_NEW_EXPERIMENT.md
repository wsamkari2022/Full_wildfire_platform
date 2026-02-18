# Adding New Experiments to Unified VRDS Platform

This guide provides step-by-step instructions for adding new experiments (like APA_ONLY or BASELINE) to the unified architecture.

## Prerequisites

- New experiment frontend application ready
- MongoDB models defined (if different from existing experiments)
- Understanding of the unified architecture (see `UNIFIED_ARCHITECTURE.md`)

## Step-by-Step Guide

### 1. Prepare Experiment Frontend Application

#### 1.1 Create or Move Experiment Directory
```bash
# If creating new experiment
mkdir -p ProdFiles/EXPERIMENT_NAME-main/EXPERIMENT_NAME-main/

# If moving existing experiment
mv old_location ProdFiles/EXPERIMENT_NAME-main/EXPERIMENT_NAME-main/
```

#### 1.2 Update `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Set base path for the experiment
  base: '/VRDS_EXPERIMENT_PATH/',

  build: {
    // Build output goes to unified backend public directory
    outDir: '../../../unified-backend/public/experiment_name',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },

  server: {
    // Use unique port for development (5175, 5176, etc.)
    port: 5175,
    proxy: {
      // Proxy API calls to unified backend
      '/VRDS_EXPERIMENT_PATH/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

#### 1.3 Update API Service (`mongoService.ts` or equivalent)
```typescript
// Use relative path that works with unified backend
const API = import.meta.env.VITE_API_URL || "/VRDS_EXPERIMENT_PATH";

// All API calls should use this base
export const MongoService = {
  async createUserSession(payload: any) {
    const res = await fetch(`${API}/api/user-sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    // ... rest of implementation
  },
  // ... other methods
};
```

### 2. Create Backend Routes

#### 2.1 Copy Route Files
```bash
# Copy existing routes as template
cp -r unified-backend/src/routes/cvr_apa/* \
      unified-backend/src/routes/experiment_name/

# Or create from scratch
mkdir -p unified-backend/src/routes/experiment_name
```

#### 2.2 Create Route Index (`unified-backend/src/routes/experiment_name/index.ts`)
```typescript
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userSessionsRouter from "./userSessions.js";
import finalDecisionsRouter from "./finalDecisions.js";
// ... import other routes

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const BASE_PATH = "/VRDS_EXPERIMENT_PATH";
const NODE_ENV = process.env.NODE_ENV || "development";

// Health check for this experiment
router.get("/api/health", (_req, res) => {
  res.json({
    message: "EXPERIMENT_NAME API",
    experiment: "EXPERIMENT_NAME",
    base: `${BASE_PATH}/api`,
    env: NODE_ENV
  });
});

// Mount all API routes
router.use("/api/user-sessions", userSessionsRouter);
router.use("/api/final-decisions", finalDecisionsRouter);
// ... mount other routes

// Serve static frontend files in production
if (NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "..", "..", "..", "public", "experiment_name");
  router.use(express.static(distPath));

  // SPA fallback
  router.get("/*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

export default router;
```

#### 2.3 Review and Update Individual Route Files
Ensure each route file:
- Imports correct models from `../models/`
- Includes proper error handling
- Uses consistent response format
- Logs appropriately

Example route file:
```typescript
import { Router, Request, Response } from "express";
import { UserSession } from "../../models/UserSession.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { session_id, demographics, consent_agreed } = req.body || {};

    if (!session_id || !demographics) {
      return res.status(400).json({
        ok: false,
        error: "session_id and demographics are required"
      });
    }

    // Set experiment condition for this experiment
    const experiment_condition = "EXPERIMENT_NAME";

    const doc = await UserSession.create({
      session_id,
      experiment_condition,
      demographics,
      consent_agreed: !!consent_agreed,
    });

    return res.status(201).json({ ok: true, id: doc._id });
  } catch (err: any) {
    console.error("POST /api/user-sessions error:", err.message);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
```

### 3. Register Experiment in Unified Server

#### 3.1 Update `unified-backend/src/server.ts`
```typescript
// Add import at top
import experimentNameRoutes from "./routes/experiment_name/index.js";

// In experiments list (update /api/experiments endpoint)
app.get("/api/experiments", (_req, res) => {
  res.json({
    experiments: [
      { name: "CVR_APA", path: "/VRDS_CVR_APA", active: true },
      { name: "CVR_ONLY", path: "/VRDS_CVR", active: true },
      { name: "APA_ONLY", path: "/VRDS_APA", active: true }, // ← Update
      { name: "BASELINE", path: "/VRDS_BASELINE", active: true }, // ← Update
      { name: "EXPERIMENT_NAME", path: "/VRDS_EXPERIMENT_PATH", active: true }, // ← Add new
    ],
    port: PORT
  });
});

// Mount the router
app.use("/VRDS_EXPERIMENT_PATH", experimentNameRoutes);

// Update /assign endpoint to include new experiment
app.get("/assign", (req, res) => {
  const EXPERIMENTS = [
    { path: "/VRDS_CVR_APA", name: "CVR_APA", active: true },
    { path: "/VRDS_CVR", name: "CVR_ONLY", active: true },
    { path: "/VRDS_EXPERIMENT_PATH", name: "EXPERIMENT_NAME", active: true }, // ← Add
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
```

### 4. Update Build and Deployment Scripts

#### 4.1 Update `build-all.sh`
```bash
#!/usr/bin/env bash
set -euo pipefail

echo "======================================"
echo "Building Unified VRDS Platform"
echo "======================================"

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

CVR_APA_DIR="$PROJECT_ROOT/ProdFiles/CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main"
CVR_ONLY_DIR="$PROJECT_ROOT/ProdFiles/CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main"
EXPERIMENT_NAME_DIR="$PROJECT_ROOT/ProdFiles/EXPERIMENT_NAME-main/EXPERIMENT_NAME-main"  # ← Add
UNIFIED_BACKEND_DIR="$PROJECT_ROOT/unified-backend"

echo ""
echo "Step 1: Installing unified backend dependencies..."
cd "$UNIFIED_BACKEND_DIR"
npm install

echo ""
echo "Step 2: Building CVR_APA frontend..."
cd "$CVR_APA_DIR"
npm install
npm run build

echo ""
echo "Step 3: Building CVR_ONLY frontend..."
cd "$CVR_ONLY_DIR"
npm install
npm run build

echo ""
echo "Step 4: Building EXPERIMENT_NAME frontend..."  # ← Add
cd "$EXPERIMENT_NAME_DIR"
npm install
npm run build

echo ""
echo "Step 5: Building unified backend..."  # ← Update step number
cd "$UNIFIED_BACKEND_DIR"
npm run build

echo ""
echo "======================================"
echo "Build Complete!"
echo "======================================"
echo "Frontend builds are in: unified-backend/public/"
echo "  - CVR_APA:  unified-backend/public/cvr_apa/"
echo "  - CVR_ONLY: unified-backend/public/cvr_only/"
echo "  - EXPERIMENT_NAME: unified-backend/public/experiment_name/"  # ← Add
echo ""
echo "Backend build is in: unified-backend/dist/"
echo ""
echo "To start the server:"
echo "  cd unified-backend && npm start"
echo "Or use: ./start-unified.sh"
echo "======================================"
```

#### 4.2 Update `dev-all.sh`
```bash
#!/usr/bin/env bash
set -euo pipefail

echo "======================================"
echo "Starting Unified VRDS Development Environment"
echo "======================================"

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CVR_APA_DIR="$PROJECT_ROOT/ProdFiles/CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main"
CVR_ONLY_DIR="$PROJECT_ROOT/ProdFiles/CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main"
EXPERIMENT_NAME_DIR="$PROJECT_ROOT/ProdFiles/EXPERIMENT_NAME-main/EXPERIMENT_NAME-main"  # ← Add
UNIFIED_BACKEND_DIR="$PROJECT_ROOT/unified-backend"

echo ""
echo "Installing dependencies if needed..."

if [ ! -d "$UNIFIED_BACKEND_DIR/node_modules" ]; then
  echo "Installing unified backend dependencies..."
  cd "$UNIFIED_BACKEND_DIR" && npm install
fi

if [ ! -d "$CVR_APA_DIR/node_modules" ]; then
  echo "Installing CVR_APA dependencies..."
  cd "$CVR_APA_DIR" && npm install
fi

if [ ! -d "$CVR_ONLY_DIR/node_modules" ]; then
  echo "Installing CVR_ONLY dependencies..."
  cd "$CVR_ONLY_DIR" && npm install
fi

if [ ! -d "$EXPERIMENT_NAME_DIR/node_modules" ]; then  # ← Add
  echo "Installing EXPERIMENT_NAME dependencies..."
  cd "$EXPERIMENT_NAME_DIR" && npm install
fi

echo ""
echo "======================================"
echo "Starting all services..."
echo "======================================"
echo "Unified Backend:         http://localhost:4000"
echo "CVR_APA Frontend:        http://localhost:5173"
echo "CVR_ONLY Frontend:       http://localhost:5174"
echo "EXPERIMENT_NAME Frontend: http://localhost:5175"  # ← Add
echo ""
echo "Landing Page:            http://localhost:4000/"
echo "CVR_APA App:             http://localhost:4000/VRDS_CVR_APA"
echo "CVR_ONLY App:            http://localhost:4000/VRDS_CVR"
echo "EXPERIMENT_NAME App:     http://localhost:4000/VRDS_EXPERIMENT_PATH"  # ← Add
echo ""
echo "Press Ctrl+C to stop all services"
echo "======================================"
echo ""

trap 'kill 0' EXIT

cd "$UNIFIED_BACKEND_DIR" && npm run dev &
cd "$CVR_APA_DIR" && npm run dev &
cd "$CVR_ONLY_DIR" && npm run dev &
cd "$EXPERIMENT_NAME_DIR" && npm run dev &  # ← Add

wait
```

### 5. Update Environment Configuration

#### 5.1 Update `unified-backend/.env`
```bash
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/wildfire_study

# Add new experiment to active list
ACTIVE_EXPERIMENTS=CVR_APA,CVR_ONLY,EXPERIMENT_NAME
```

### 6. Add Custom Models (if needed)

If the new experiment requires unique models:

#### 6.1 Create Model File
```typescript
// unified-backend/src/models/ExperimentSpecificModel.ts
import mongoose, { Schema } from "mongoose";

const ExperimentSpecificSchema = new Schema(
  {
    session_id: { type: String, required: true, index: true },
    experiment_condition: { type: String, required: true, index: true },
    // ... experiment-specific fields
    created_at: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export const ExperimentSpecificModel = mongoose.model(
  "experiment_specific_collection",
  ExperimentSpecificSchema
);
```

#### 6.2 Import in Route Files
```typescript
import { ExperimentSpecificModel } from "../../models/ExperimentSpecificModel.js";
```

### 7. Testing

#### 7.1 Test in Development Mode
```bash
# Start all services
./dev-all.sh

# Test:
# 1. Visit http://localhost:4000/ (landing page)
# 2. Click "Begin Study" multiple times to verify random assignment
# 3. Check that experiment loads correctly
# 4. Test API endpoints work
# 5. Verify data saves to MongoDB
# 6. Check browser console for errors
# 7. Review server logs for issues
```

#### 7.2 Test Production Build
```bash
# Build everything
./build-all.sh

# Start production server
./start-unified.sh

# Test:
# 1. Visit http://localhost:4000/
# 2. Verify static files serve correctly
# 3. Test all functionality
# 4. Check for console errors
# 5. Verify MongoDB data persistence
```

### 8. Deployment Checklist

- [ ] All frontend builds complete successfully
- [ ] Backend compiles without errors
- [ ] Environment variables configured for production
- [ ] MongoDB connection tested
- [ ] All experiments accessible via web browser
- [ ] API endpoints respond correctly
- [ ] Data saves to MongoDB
- [ ] Landing page random assignment works
- [ ] No console errors in any experiment
- [ ] Server logs show no errors
- [ ] CORS configured correctly
- [ ] Security headers in place
- [ ] Performance tested under load

### 9. Common Issues and Solutions

#### Issue: Frontend 404 errors
**Solution**: Verify build output location matches server static file path
```bash
ls -la unified-backend/public/experiment_name/
```

#### Issue: API calls fail with CORS error
**Solution**: Update CORS configuration in `server.ts` to include dev port
```typescript
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175", // ← Add new dev port
    // ...
  ],
  credentials: true
}));
```

#### Issue: Routes not registering
**Solution**: Verify router is imported and mounted in `server.ts`
```typescript
import experimentNameRoutes from "./routes/experiment_name/index.js";
app.use("/VRDS_EXPERIMENT_PATH", experimentNameRoutes);
```

#### Issue: Data not saving to MongoDB
**Solution**: Check experiment_condition is set correctly in routes
```typescript
const experiment_condition = "EXPERIMENT_NAME"; // Must match your experiment
```

### 10. Maintenance Notes

#### Adding More Experiments
This process is repeatable. Each new experiment follows the same pattern:
1. Create frontend with proper vite config
2. Create backend routes
3. Register in server.ts
4. Update build scripts
5. Test and deploy

#### Deactivating Experiments
To temporarily disable an experiment without removing code:

In `server.ts`:
```typescript
const EXPERIMENTS = [
  { path: "/VRDS_CVR_APA", name: "CVR_APA", active: true },
  { path: "/VRDS_EXPERIMENT_PATH", name: "EXPERIMENT_NAME", active: false }, // ← Set false
];
```

#### Monitoring Experiment Usage
Check MongoDB for distribution:
```javascript
db.user_sessions.aggregate([
  { $group: { _id: "$experiment_condition", count: { $sum: 1 } } }
])
```

## Support

For additional help:
1. Review `UNIFIED_ARCHITECTURE.md` for architecture overview
2. Check existing experiments (CVR_APA, CVR_ONLY) as reference implementations
3. Test changes in development mode before production deployment
4. Keep backups before making major changes
