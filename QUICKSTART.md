# Unified VRDS Platform - Quick Start Guide

## Overview

All VRDS experiments now run on **port 4000** with a unified backend server.

```
🌍 Port 4000 - Everything runs here!
  ├── 🏠 Landing Page:  http://localhost:4000/
  ├── 🔬 CVR_APA:       http://localhost:4000/VRDS_CVR_APA
  ├── 🔬 CVR_ONLY:      http://localhost:4000/VRDS_CVR
  ├── 🔬 APA_ONLY:      http://localhost:4000/VRDS_APA (inactive)
  └── 🔬 BASELINE:      http://localhost:4000/VRDS_BASELINE (inactive)
```

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB running locally or accessible remotely

## Quick Start (Development Mode)

### 1. Install Dependencies & Start Everything
```bash
# From project root
./dev-all.sh
```

This will:
- Install all dependencies
- Start unified backend on port 4000
- Start CVR_APA frontend on port 5173
- Start CVR_ONLY frontend on port 5174

### 2. Access the Application
- **Landing Page**: http://localhost:4000/
- **CVR_APA**: http://localhost:4000/VRDS_CVR_APA
- **CVR_ONLY**: http://localhost:4000/VRDS_CVR

### 3. Stop All Services
Press `Ctrl+C` in the terminal running `dev-all.sh`

## Production Deployment

### 1. Build Everything
```bash
./build-all.sh
```

This builds:
- CVR_APA frontend → `unified-backend/public/cvr_apa/`
- CVR_ONLY frontend → `unified-backend/public/cvr_only/`
- Unified backend → `unified-backend/dist/`

### 2. Configure Environment
```bash
cd unified-backend
cp .env.example .env
# Edit .env with your production settings
nano .env
```

Required settings:
```bash
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb://your-mongo-host:27017/wildfire_study
```

### 3. Start Server
```bash
# Option 1: Use start script
./start-unified.sh

# Option 2: Manual start
cd unified-backend
NODE_ENV=production node dist/server.js
```

### 4. Verify Deployment
```bash
# Check health
curl http://localhost:4000/health

# List experiments
curl http://localhost:4000/api/experiments
```

## Architecture at a Glance

```
unified-backend/
├── src/
│   ├── server.ts              # Main server (port 4000)
│   ├── config/database.ts     # MongoDB connection
│   ├── models/                # Shared Mongoose models
│   ├── routes/                # Experiment-specific routes
│   │   ├── cvr_apa/          # CVR_APA API routes
│   │   ├── cvr_only/         # CVR_ONLY API routes
│   │   ├── apa_only/         # APA_ONLY (placeholder)
│   │   └── baseline/         # BASELINE (placeholder)
│   └── middleware/            # Logging, error handling
├── public/                    # Built frontend assets
│   ├── cvr_apa/              # CVR_APA build
│   └── cvr_only/             # CVR_ONLY build
└── dist/                      # Compiled backend

ProdFiles/
├── CVR_APA.../               # CVR_APA source
└── CVR_ONLY.../              # CVR_ONLY source
```

## MongoDB Setup

### Local MongoDB
```bash
# Start MongoDB
mongod --dbpath /path/to/data

# Verify connection
mongosh
use wildfire_study
show collections
```

### Remote MongoDB
Update `unified-backend/.env`:
```bash
MONGODB_URI=mongodb://username:password@host:port/wildfire_study?authSource=admin
```

## Common Commands

### Development
```bash
./dev-all.sh                    # Start all services
```

### Building
```bash
./build-all.sh                  # Build everything
cd unified-backend && npm run build    # Build backend only
```

### Running
```bash
./start-unified.sh              # Start production server
cd unified-backend && npm run dev      # Backend dev mode only
```

### Debugging
```bash
# Check what's running on port 4000
lsof -ti TCP:4000

# View server logs
cd unified-backend
tail -f logs/server.log

# Check MongoDB data
mongosh wildfire_study
db.user_sessions.find().limit(5)
```

## API Endpoints

### Global Endpoints
- `GET /health` - Health check
- `GET /api/experiments` - List all experiments
- `GET /` - Landing page
- `GET /assign` - Random experiment assignment

### CVR_APA Endpoints
- `GET /VRDS_CVR_APA/api/health` - Health check
- `POST /VRDS_CVR_APA/api/user-sessions` - Create session
- `POST /VRDS_CVR_APA/api/final-decisions` - Save decision
- ... and more

### CVR_ONLY Endpoints
- `GET /VRDS_CVR/api/health` - Health check
- `POST /VRDS_CVR/api/user-sessions` - Create session
- `POST /VRDS_CVR/api/final-decisions` - Save decision
- ... and more

## Troubleshooting

### Port 4000 Already in Use
```bash
# Find and kill process
lsof -ti TCP:4000 | xargs kill -9
```

### MongoDB Connection Failed
```bash
# Check MongoDB is running
mongosh

# Check connection string in .env
cat unified-backend/.env
```

### Frontend Not Loading
```bash
# Verify builds exist
ls -la unified-backend/public/cvr_apa/
ls -la unified-backend/public/cvr_only/

# Rebuild if missing
./build-all.sh
```

### CORS Errors
```bash
# In development: Verify Vite proxy is configured
# In production: Check CORS origins in server.ts
```

## Adding New Experiments

See `ADDING_NEW_EXPERIMENT.md` for detailed instructions.

Quick overview:
1. Create frontend app with proper `vite.config.ts`
2. Create routes in `unified-backend/src/routes/experiment_name/`
3. Register in `server.ts`
4. Update build scripts
5. Test and deploy

## Migration from Old Architecture

### Old System (Multi-Port)
- Landing: 3999
- CVR_APA: 4001
- CVR_ONLY: 4002
- APA_ONLY: 4003
- BASELINE: 4004

### New System (Single Port)
- Everything: **4000**
- Different paths instead of ports

### What Changed
- ✅ Single port simplifies deployment
- ✅ Shared backend reduces resource usage
- ✅ Centralized logging and monitoring
- ✅ Easier to maintain and scale
- ⚠️ Update any hardcoded port references
- ⚠️ Adjust firewall rules to allow port 4000
- ⚠️ Update reverse proxy configs if applicable

## Next Steps

1. ✅ Read `UNIFIED_ARCHITECTURE.md` for detailed architecture
2. ✅ Review `ADDING_NEW_EXPERIMENT.md` to add APA_ONLY and BASELINE
3. ✅ Set up monitoring and alerting
4. ✅ Configure backups for MongoDB
5. ✅ Set up SSL/TLS for production
6. ✅ Implement rate limiting if needed

## Support

For issues or questions:
1. Check logs: `unified-backend/logs/`
2. Verify MongoDB connection
3. Review documentation in this directory
4. Test in development mode first

## Key Files

- `UNIFIED_ARCHITECTURE.md` - Detailed architecture documentation
- `ADDING_NEW_EXPERIMENT.md` - Guide for adding experiments
- `build-all.sh` - Build script
- `start-unified.sh` - Production start script
- `dev-all.sh` - Development mode script
- `unified-backend/.env` - Environment configuration

---

**Unified Platform Version**: 1.0.0
**Port**: 4000
**Active Experiments**: CVR_APA, CVR_ONLY
**Future Experiments**: APA_ONLY, BASELINE
