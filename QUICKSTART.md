# Unified VRDS Platform - Quick Start Guide

## 🚀 Complete Setup Checklist

Follow this checklist to get the project running:

- [ ] Install Node.js >= 18.0.0 (check: `node --version`)
- [ ] Install npm >= 9.0.0 (check: `npm --version`)
- [ ] Install MongoDB >= 5.0.0 (check: `mongod --version`)
- [ ] Start MongoDB service
- [ ] Clone/download the project
- [ ] Create `unified-backend/.env` file with MongoDB URI
- [ ] Install unified-backend dependencies: `cd unified-backend && npm install`
- [ ] Install CVR_APA dependencies: `cd ProdFiles/CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main && npm install`
- [ ] Install CVR_ONLY dependencies: `cd ProdFiles/CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main && npm install`
- [ ] Start backend: `cd unified-backend && npm run dev`
- [ ] Start CVR_APA: `npm run dev` (in CVR_APA directory)
- [ ] Start CVR_ONLY: `npm run dev` (in CVR_ONLY directory)
- [ ] Open browser to http://localhost:4000/

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

### System Requirements
- **Node.js** >= 18.0.0 (Download from https://nodejs.org/)
- **npm** >= 9.0.0 (Comes with Node.js)
- **MongoDB** >= 5.0.0 (Local or remote instance)
- **Git** (for version control)

### Installing Prerequisites

#### 1. Install Node.js and npm
```bash
# Check if already installed
node --version  # Should show v18.0.0 or higher
npm --version   # Should show v9.0.0 or higher

# If not installed, download from:
# https://nodejs.org/en/download/
# Or use a package manager:

# macOS (using Homebrew)
brew install node

# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Windows
# Download installer from https://nodejs.org/
```

#### 2. Install MongoDB
```bash
# Check if already installed
mongod --version  # Should show v5.0.0 or higher

# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Windows
# Download installer from https://www.mongodb.com/try/download/community
# Or use Chocolatey:
choco install mongodb

# Verify MongoDB is running
mongosh  # Should connect to MongoDB shell
```

#### 3. Install Project Dependencies
```bash
# Navigate to project root
cd /path/to/your/project

# Install unified backend dependencies
cd unified-backend
npm install

# Install CVR_APA frontend dependencies
cd ../ProdFiles/CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main
npm install

# Install CVR_ONLY frontend dependencies
cd ../../../CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main
npm install

# Return to project root
cd ../../../../
```

### Environment Configuration

Create a `.env` file in the `unified-backend` directory:

```bash
cd unified-backend
cp .env.example .env
```

Edit the `.env` file with your settings:
```bash
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/wildfire_study

# Optional: If MongoDB requires authentication
# MONGODB_URI=mongodb://username:password@localhost:27017/wildfire_study
```

## Quick Start (Development Mode)

### Option 1: Automated Script (Linux/macOS)

If you're on Linux or macOS, you can use the automated script:

```bash
# From project root
./dev-all.sh
```

This will:
- Install all dependencies
- Start unified backend on port 4000
- Start CVR_APA frontend on port 5173
- Start CVR_ONLY frontend on port 5174

### Option 2: Manual Start (All Platforms - Windows/Linux/macOS)

If the script doesn't work (Windows, permission issues, etc.), start each service manually:

#### Terminal 1 - Start MongoDB
```bash
# Make sure MongoDB is running
mongod
# Or if installed as service:
# macOS: brew services start mongodb-community
# Ubuntu: sudo systemctl start mongod
# Windows: net start MongoDB
```

#### Terminal 2 - Start Unified Backend
```bash
# Navigate to unified backend
cd unified-backend

# Install dependencies (first time only)
npm install

# Start backend server
npm run dev
```

The backend should start on **http://localhost:4000**

#### Terminal 3 - Start CVR_APA Frontend
```bash
# Navigate to CVR_APA directory
cd ProdFiles/CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

The CVR_APA frontend should start on **http://localhost:5173**

#### Terminal 4 - Start CVR_ONLY Frontend
```bash
# Navigate to CVR_ONLY directory
cd ProdFiles/CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

The CVR_ONLY frontend should start on **http://localhost:5174**

### 2. Access the Application

Open your browser and navigate to:
- **Landing Page**: http://localhost:4000/
- **CVR_APA Experiment**: http://localhost:4000/VRDS_CVR_APA
- **CVR_ONLY Experiment**: http://localhost:4000/VRDS_CVR
- **Health Check**: http://localhost:4000/health
- **API Experiments List**: http://localhost:4000/api/experiments

### 3. Stop All Services

- Press `Ctrl+C` in each terminal window to stop the respective service
- Or if using the script, `Ctrl+C` once will stop all services

## Troubleshooting Common Issues

### 1. Script Permission Denied

If you get "Permission denied" when running `./dev-all.sh`:
```bash
# Make scripts executable
chmod +x dev-all.sh build-all.sh start-unified.sh run_all_vrds_with_landing.sh
```

### 2. MongoDB Connection Error

If you see "MongoServerError: connect ECONNREFUSED":
```bash
# Check if MongoDB is running
mongosh

# If not running, start it:
# macOS:
brew services start mongodb-community

# Ubuntu/Debian:
sudo systemctl start mongod

# Windows:
net start MongoDB
```

### 3. Port Already in Use

If port 4000, 5173, or 5174 is already in use:
```bash
# Find process using the port (macOS/Linux)
lsof -i :4000
lsof -i :5173
lsof -i :5174

# Kill the process
kill -9 <PID>

# On Windows:
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

Or change ports in:
- Backend: `unified-backend/.env` (change PORT)
- CVR_APA: `vite.config.ts` (change server.port)
- CVR_ONLY: `vite.config.ts` (change server.port)

### 4. npm Install Fails

If `npm install` fails:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still failing, try updating npm
npm install -g npm@latest
```

### 5. TypeScript Build Errors

If `npm run build` fails in unified-backend:
```bash
cd unified-backend

# Clean build directory
rm -rf dist

# Rebuild
npm run build
```

### 6. Frontend Not Loading

If frontend shows blank page:
```bash
# Check browser console for errors
# Common issues:

# 1. Backend not running - Start backend first
cd unified-backend
npm run dev

# 2. Wrong base path - Check vite.config.ts
# CVR_APA should have: base: '/VRDS_CVR_APA/'
# CVR_ONLY should have: base: '/VRDS_CVR/'

# 3. API proxy not working - Check vite.config.ts proxy settings
```

### 7. Database Data Not Saving

If data isn't saving to MongoDB:
```bash
# Check MongoDB connection in backend logs
# Should see: "✅ MongoDB connected successfully"

# Test MongoDB directly
mongosh
use wildfire_study
db.usersessions.find().limit(5)

# If empty, check:
# 1. MONGODB_URI in unified-backend/.env
# 2. MongoDB authentication if required
# 3. Network/firewall settings if using remote MongoDB
```

### 8. Landing Page Not Redirecting

If landing page doesn't redirect to experiments:
```bash
# Check that experiments are marked as active
curl http://localhost:4000/api/experiments

# Should show:
# { "experiments": [
#     { "name": "CVR_APA", "path": "/VRDS_CVR_APA", "active": true },
#     { "name": "CVR_ONLY", "path": "/VRDS_CVR", "active": true }
# ]}
```

### 9. Windows-Specific Issues

If on Windows and scripts don't work:
```bash
# Use Git Bash or WSL (Windows Subsystem for Linux)
# Or run commands manually as shown in "Manual Start" section above

# For WSL:
wsl --install
# Then follow Linux instructions
```

## Production Deployment

### 1. Build Everything

#### Option A: Automated Script (Linux/macOS)
```bash
./build-all.sh
```

#### Option B: Manual Build (All Platforms)
```bash
# 1. Build CVR_APA Frontend
cd ProdFiles/CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main
npm install  # If not already done
npm run build
# Output: unified-backend/public/cvr_apa/

# 2. Build CVR_ONLY Frontend
cd ../../../CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main
npm install  # If not already done
npm run build
# Output: unified-backend/public/cvr_only/

# 3. Build Unified Backend
cd ../../../../unified-backend
npm install  # If not already done
npm run build
# Output: unified-backend/dist/
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

#### Option A: Automated Script (Linux/macOS)
```bash
./start-unified.sh
```

#### Option B: Manual Start (All Platforms)
```bash
cd unified-backend

# Linux/macOS:
NODE_ENV=production node dist/server.js

# Windows (PowerShell):
$env:NODE_ENV="production"; node dist/server.js

# Windows (CMD):
set NODE_ENV=production && node dist/server.js
```

Or use a process manager for production:
```bash
# Using PM2 (recommended for production)
npm install -g pm2
cd unified-backend
pm2 start dist/server.js --name vrds-platform

# View logs
pm2 logs vrds-platform

# Stop
pm2 stop vrds-platform

# Restart
pm2 restart vrds-platform
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
