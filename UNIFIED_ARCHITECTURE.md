# Unified VRDS Architecture Documentation

## Overview

This document describes the unified architecture that consolidates all VRDS experiments to run on a single port (4000) with a shared backend server and MongoDB database.

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    Port 4000 - Unified Server                │
│                                                               │
│  ┌───────────────┐  ┌──────────────────────────────────┐   │
│  │  Landing Page │  │   Unified Backend (Express)      │   │
│  │  Route: /     │  │                                   │   │
│  └───────────────┘  │  ┌────────────────────────────┐  │   │
│                     │  │  Experiment Routes          │  │   │
│  ┌───────────────┐  │  │  • /VRDS_CVR_APA (CVR_APA) │  │   │
│  │  CVR_APA      │◄─┤  │  • /VRDS_CVR (CVR_ONLY)    │  │   │
│  │  Frontend     │  │  │  • /VRDS_APA (APA_ONLY)    │  │   │
│  └───────────────┘  │  │  • /VRDS_BASELINE          │  │   │
│                     │  └────────────────────────────┘  │   │
│  ┌───────────────┐  │                                   │   │
│  │  CVR_ONLY     │◄─┤  ┌────────────────────────────┐  │   │
│  │  Frontend     │  │  │  Shared Resources          │  │   │
│  └───────────────┘  │  │  • Database Config         │  │   │
│                     │  │  • Models                   │  │   │
│  ┌───────────────┐  │  │  • Middleware              │  │   │
│  │  APA_ONLY     │◄─┤  │  • Logging                 │  │   │
│  │  (Inactive)   │  │  └────────────────────────────┘  │   │
│  └───────────────┘  │                                   │   │
│                     │              ▼                    │   │
│  ┌───────────────┐  │  ┌────────────────────────────┐  │   │
│  │  BASELINE     │◄─┤  │      MongoDB Database       │  │   │
│  │  (Inactive)   │  │  │  • user_sessions           │  │   │
│  └───────────────┘  │  │  • session_metrics         │  │   │
│                     │  │  • final_decisions         │  │   │
└─────────────────────┴──┴────────────────────────────────┘
```

## Directory Structure

```
wildfire-platform/
├── unified-backend/               # Unified backend server
│   ├── src/
│   │   ├── server.ts             # Main server file
│   │   ├── config/
│   │   │   └── database.ts       # MongoDB connection
│   │   ├── models/               # Shared Mongoose models
│   │   │   ├── UserSession.ts
│   │   │   ├── FinalDecision.ts
│   │   │   ├── SessionMetrics.ts
│   │   │   └── ...
│   │   ├── routes/               # Experiment-specific routes
│   │   │   ├── cvr_apa/
│   │   │   │   ├── index.ts      # Route aggregator
│   │   │   │   ├── userSessions.ts
│   │   │   │   └── ...
│   │   │   ├── cvr_only/
│   │   │   │   ├── index.ts
│   │   │   │   └── ...
│   │   │   ├── apa_only/
│   │   │   │   └── index.ts      # Placeholder
│   │   │   └── baseline/
│   │   │       └── index.ts      # Placeholder
│   │   ├── middleware/
│   │   │   └── experimentLogger.ts
│   │   └── utils/
│   ├── public/                   # Built frontend assets
│   │   ├── cvr_apa/             # CVR_APA build output
│   │   ├── cvr_only/            # CVR_ONLY build output
│   │   ├── apa_only/            # Future
│   │   └── baseline/            # Future
│   ├── dist/                     # Compiled TypeScript
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                      # Environment configuration
│   └── .env.example
│
├── ProdFiles/
│   ├── CVR_APA_Production_Phase_Attempts-main/
│   │   └── CVR_APA_Production_Phase_Attempts-main/
│   │       ├── src/              # React app source
│   │       ├── vite.config.ts    # Updated to build to unified-backend/public/cvr_apa
│   │       └── package.json
│   └── CVR_ONLY_Production_Attempts-main/
│       └── CVR_ONLY_Production_Attempts-main/
│           ├── src/              # React app source
│           ├── vite.config.ts    # Updated to build to unified-backend/public/cvr_only
│           └── package.json
│
├── build-all.sh                  # Build script for all components
├── start-unified.sh              # Production startup script
├── dev-all.sh                    # Development mode script
└── UNIFIED_ARCHITECTURE.md       # This file
```

## Request Flow

### Landing Page Assignment
1. User visits `http://localhost:4000/` or `http://localhost:4000/landingpage`
2. User clicks "Begin Study"
3. Frontend calls `/assign` endpoint
4. Backend randomly selects an active experiment
5. Backend returns path (e.g., `/VRDS_CVR_APA`)
6. User is redirected to experiment path
7. Frontend app loads from `unified-backend/public/cvr_apa/`

### API Requests (Production)
1. Frontend makes request to `/VRDS_CVR_APA/api/user-sessions`
2. Unified server routes to CVR_APA experiment router
3. Router handles request using shared models
4. Data is saved to MongoDB with experiment context
5. Response returned to frontend

### API Requests (Development)
1. Frontend dev server (port 5173) proxies `/VRDS_CVR_APA/api/*` to port 4000
2. Unified backend receives proxied request
3. Routes to appropriate experiment handler
4. Returns response

## Key Components

### 1. Unified Server (`unified-backend/src/server.ts`)
- Single Express application listening on port 4000
- Mounts experiment-specific routers at base paths:
  - `/VRDS_CVR_APA` → CVR_APA routes
  - `/VRDS_CVR` → CVR_ONLY routes
  - `/VRDS_APA` → APA_ONLY routes (placeholder)
  - `/VRDS_BASELINE` → BASELINE routes (placeholder)
- Serves landing page at `/`
- Handles random experiment assignment at `/assign`
- Provides health check at `/health`
- Lists experiments at `/api/experiments`

### 2. Experiment Routers (`unified-backend/src/routes/*/index.ts`)
Each experiment has its own router that:
- Mounts all API endpoints under `/api/*`
- Serves static frontend files in production
- Provides experiment-specific health check
- Handles SPA fallback routing

### 3. Shared Models (`unified-backend/src/models/`)
All experiments use the same MongoDB models:
- UserSession
- FinalDecision
- SessionMetrics
- SessionFeedback
- ValueEvolution
- ValueStability
- APAReordering
- CVRResponse
- ScenarioInteraction
- BaselineValue

### 4. Database Configuration (`unified-backend/src/config/database.ts`)
- Single MongoDB connection shared across all experiments
- Connection pooling and reconnection logic
- Error handling and logging

### 5. Middleware (`unified-backend/src/middleware/experimentLogger.ts`)
- Logs all requests with experiment context
- Tracks request duration
- Adds experiment name to request headers

## Port Configuration

### Production
- **Single Port**: 4000
- All experiments accessible through different paths on same port
- Landing page: `http://localhost:4000/`
- CVR_APA: `http://localhost:4000/VRDS_CVR_APA`
- CVR_ONLY: `http://localhost:4000/VRDS_CVR`

### Development
- **Backend**: 4000 (unified server)
- **CVR_APA Frontend**: 5173 (Vite dev server with proxy)
- **CVR_ONLY Frontend**: 5174 (Vite dev server with proxy)
- Frontends proxy API calls to backend on port 4000

## Environment Configuration

### Unified Backend (`.env`)
```bash
PORT=4000
NODE_ENV=development|production
MONGODB_URI=mongodb://localhost:27017/wildfire_study
ACTIVE_EXPERIMENTS=CVR_APA,CVR_ONLY
```

### No Frontend `.env` Required
Frontends use relative paths and Vite proxy configuration. No environment variables needed.

## MongoDB Data Organization

All experiments share the same database with separate collections:

```
wildfire_study (database)
├── user_sessions           # All experiments
├── final_decisions         # All experiments
├── session_metrics         # All experiments
├── session_feedback        # All experiments
├── value_evolution         # All experiments
├── value_stability         # All experiments
├── apa_reorderings         # All experiments
├── cvr_responses           # All experiments
├── scenario_interactions   # All experiments
└── baseline_values         # All experiments
```

Each document includes `session_id` and `experiment_condition` fields to identify which experiment it belongs to.

## Deployment

### Build Process
```bash
# Build all components
./build-all.sh

# This will:
# 1. Install unified backend dependencies
# 2. Build CVR_APA frontend → unified-backend/public/cvr_apa/
# 3. Build CVR_ONLY frontend → unified-backend/public/cvr_only/
# 4. Compile unified backend TypeScript → unified-backend/dist/
```

### Start Production Server
```bash
# Start the unified server
./start-unified.sh

# Or manually:
cd unified-backend
NODE_ENV=production node dist/server.js
```

### Development Mode
```bash
# Start all services (backend + both frontends)
./dev-all.sh

# This runs:
# - Unified backend on port 4000 (with auto-restart)
# - CVR_APA frontend on port 5173 (with HMR)
# - CVR_ONLY frontend on port 5174 (with HMR)
```

## Adding New Experiments

To add a new experiment (e.g., APA_ONLY or BASELINE):

1. **Create frontend application** in `ProdFiles/`
2. **Configure Vite build** to output to `unified-backend/public/experiment_name/`
3. **Copy route files** to `unified-backend/src/routes/experiment_name/`
4. **Update router index** to use experiment-specific models if needed
5. **Update `.env`** to activate the experiment
6. **Update `build-all.sh`** to include new build step
7. **Test** in development mode first
8. **Deploy** with updated build

See `ADDING_NEW_EXPERIMENT.md` for detailed step-by-step guide.

## Monitoring and Logging

### Request Logging
All requests are logged with:
- Timestamp
- Experiment name
- HTTP method
- Path
- Status code
- Duration

Example:
```
[2024-02-18T20:00:00.000Z] CVR_APA POST /VRDS_CVR_APA/api/user-sessions 201 45ms
[2024-02-18T20:00:05.000Z] CVR_ONLY GET /VRDS_CVR/api/health 200 3ms
```

### Health Checks
- Global: `http://localhost:4000/health`
- CVR_APA: `http://localhost:4000/VRDS_CVR_APA/api/health`
- CVR_ONLY: `http://localhost:4000/VRDS_CVR/api/health`

### Experiment Status
- `http://localhost:4000/api/experiments`
  Returns list of all experiments with active/inactive status

## Security Considerations

### CORS Configuration
- **Development**: Allows localhost origins on various ports
- **Production**: Only allows moonlander.fit.edu domain

### Security Headers (Production)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Environment Variables
- Never commit `.env` files
- Use `.env.example` as template
- Keep MongoDB credentials secure
- Use environment-specific configurations

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 4000
lsof -ti TCP:4000

# Kill the process
kill -9 $(lsof -ti TCP:4000)
```

### MongoDB Connection Issues
1. Ensure MongoDB is running: `mongosh`
2. Check MONGODB_URI in `.env`
3. Verify network connectivity
4. Check MongoDB logs

### Frontend Not Loading
1. Verify build completed: check `unified-backend/public/`
2. Check NODE_ENV is set to "production"
3. Look for errors in browser console
4. Check server logs for 404s

### API Requests Failing
1. Verify backend is running on port 4000
2. Check CORS configuration
3. Verify experiment router is mounted correctly
4. Check request path matches expected format
5. Review server logs for errors

## Performance Considerations

### Benefits of Unified Architecture
- **Reduced Memory**: One Node process instead of 5
- **Shared Connection Pool**: MongoDB connections reused across experiments
- **Simplified Deployment**: Single service to manage
- **Easier Monitoring**: Centralized logs and metrics

### Scalability
- Add load balancer for multiple instances
- Use PM2 cluster mode for CPU utilization
- Implement Redis for session management
- Add caching layer for static assets

## Migration from Old Architecture

### Old Architecture (Multi-Port)
- Landing: 3999
- CVR_APA: 4001
- CVR_ONLY: 4002
- APA_ONLY: 4003
- BASELINE: 4004

### New Architecture (Single Port)
- Everything: 4000
- Paths: /, /VRDS_CVR_APA, /VRDS_CVR, /VRDS_APA, /VRDS_BASELINE

### Breaking Changes
- Port numbers in URLs must be updated to 4000
- Firewall rules need adjustment (only port 4000 required)
- Reverse proxy configuration changes
- Process management (1 process instead of 5)

## Support

For questions or issues:
1. Check this documentation
2. Review server logs
3. Check MongoDB connection
4. Verify environment configuration
5. Test in development mode first
