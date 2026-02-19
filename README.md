# Unified VRDS Platform

A unified research platform for wildfire decision-making experiments running on **port 4000** with path-based routing.

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB** >= 5.0.0

### Installation & Setup

1. **Install system dependencies** (see [DEPENDENCIES.md](DEPENDENCIES.md))
2. **Configure environment**:
   ```bash
   cd unified-backend
   cp .env.example .env
   # Edit .env with your MongoDB URI
   ```
3. **Install project dependencies**:
   ```bash
   cd unified-backend && npm install
   cd ../ProdFiles/CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main && npm install
   cd ../../../CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main && npm install
   ```
4. **Start services** (3 separate terminals):
   ```bash
   # Terminal 1 - Backend
   cd unified-backend && npm run dev

   # Terminal 2 - CVR_APA
   cd ProdFiles/CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main && npm run dev

   # Terminal 3 - CVR_ONLY
   cd ProdFiles/CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main && npm run dev
   ```
5. **Open browser**: http://localhost:4000/

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Complete setup guide with troubleshooting
- **[DEPENDENCIES.md](DEPENDENCIES.md)** - Detailed dependency installation instructions
- **[UNIFIED_ARCHITECTURE.md](UNIFIED_ARCHITECTURE.md)** - System architecture and design
- **[ADDING_NEW_EXPERIMENT.md](ADDING_NEW_EXPERIMENT.md)** - Guide for adding new experiments
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical implementation details

## 🏗️ Project Structure

```
🌍 Port 4000 - Everything runs here!
  ├── 🏠 /                      → Landing Page (random assignment)
  ├── 🔬 /VRDS_CVR_APA          → CVR + APA experiment (active)
  ├── 🔬 /VRDS_CVR              → CVR only experiment (active)
  ├── 🔬 /VRDS_APA              → APA only experiment (coming soon)
  └── 🔬 /VRDS_BASELINE         → Baseline experiment (coming soon)
```

### Directory Structure

```
project/
├── unified-backend/           # Unified Express server (port 4000)
│   ├── src/
│   │   ├── server.ts         # Main server file
│   │   ├── config/           # Database configuration
│   │   ├── models/           # Shared Mongoose models
│   │   ├── routes/           # Experiment-specific API routes
│   │   │   ├── cvr_apa/     # CVR_APA routes
│   │   │   ├── cvr_only/    # CVR_ONLY routes
│   │   │   ├── apa_only/    # APA_ONLY routes (placeholder)
│   │   │   └── baseline/    # BASELINE routes (placeholder)
│   │   └── middleware/       # Request logging & tracking
│   ├── public/               # Built frontend files (production)
│   │   ├── cvr_apa/
│   │   └── cvr_only/
│   └── dist/                 # Compiled TypeScript (production)
│
├── ProdFiles/
│   ├── CVR_APA_Production_Phase_Attempts-main/
│   │   └── CVR_APA_Production_Phase_Attempts-main/  # React + Vite (port 5173 dev)
│   └── CVR_ONLY_Production_Attempts-main/
│       └── CVR_ONLY_Production_Attempts-main/        # React + Vite (port 5174 dev)
│
├── landing_server/           # Legacy landing page (deprecated, port 3999)
│
└── Scripts & Docs
    ├── dev-all.sh           # Start all services (development)
    ├── build-all.sh         # Build all components (production)
    ├── start-unified.sh     # Start unified server (production)
    ├── QUICKSTART.md        # Quick start guide
    ├── DEPENDENCIES.md      # Dependency installation guide
    └── UNIFIED_ARCHITECTURE.md  # Architecture documentation
```

## 🎯 Key Features

- **Single Port**: All experiments accessible via port 4000
- **Path-Based Routing**: Clean URLs with experiment identification
- **Unified Backend**: Shared database connection and models
- **Experiment Isolation**: Separate routes and data namespacing
- **Random Assignment**: Landing page randomly assigns participants
- **MongoDB Integration**: All data stored in MongoDB
- **TypeScript**: Type-safe backend development
- **Hot Module Replacement**: Fast development with Vite
- **Production Ready**: Optimized builds and static file serving
- **Extensible**: Easy to add new experiments

## 🧪 Available Endpoints

### Landing Page
- `GET /` - Landing page with random assignment
- `GET /assign` - Get random experiment assignment

### Health & Info
- `GET /health` - Server health check
- `GET /api/experiments` - List all experiments and their status

### CVR_APA Experiment
- `GET /VRDS_CVR_APA` - CVR_APA experiment UI
- `POST /VRDS_CVR_APA/api/*` - CVR_APA API endpoints

### CVR_ONLY Experiment
- `GET /VRDS_CVR` - CVR_ONLY experiment UI
- `POST /VRDS_CVR/api/*` - CVR_ONLY API endpoints

### Coming Soon
- `/VRDS_APA` - APA only experiment
- `/VRDS_BASELINE` - Baseline experiment

## 🔧 Development

### Development Mode
Runs with hot module replacement:
```bash
cd unified-backend && npm run dev        # Backend with auto-restart
cd <experiment-dir> && npm run dev       # Frontend with HMR
```

### Production Build
```bash
./build-all.sh                           # Build all components
./start-unified.sh                       # Start production server
```

### Testing
```bash
# Health check
curl http://localhost:4000/health

# List experiments
curl http://localhost:4000/api/experiments

# Test MongoDB connection
mongosh
use wildfire_study
db.usersessions.find().limit(5)
```

## 📊 Database

**MongoDB Collections** (per experiment):
- `usersessions` - User session data
- `baselinevalues` - Initial value assessments
- `cvrresponses` - CVR question responses
- `apareorderings` - APA preference reorderings
- `scenariointeractions` - User interactions with scenarios
- `finaldecisions` - Final decision data
- `valueevolution` - Value change tracking
- `valuestability` - Value stability metrics
- `sessionmetrics` - Performance metrics
- `sessionfeedback` - User feedback

## 🚨 Troubleshooting

See [QUICKSTART.md](QUICKSTART.md#troubleshooting-common-issues) for:
- Script permission issues
- MongoDB connection errors
- Port conflicts
- npm install failures
- Frontend not loading
- Database data not saving

## 🛠️ Technology Stack

**Backend**:
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- CORS middleware

**Frontend**:
- React 18
- TypeScript
- Vite (build tool)
- Tailwind CSS

**Development**:
- tsx (TypeScript execution)
- nodemon (auto-restart)
- Hot Module Replacement

## 📝 Adding New Experiments

See [ADDING_NEW_EXPERIMENT.md](ADDING_NEW_EXPERIMENT.md) for step-by-step instructions on:
1. Creating new experiment routes
2. Configuring frontend builds
3. Setting up data models
4. Activating experiments

## 🤝 Contributing

1. Make changes in appropriate directories
2. Test locally with `npm run dev`
3. Build for production with `./build-all.sh`
4. Commit changes (avoid committing `node_modules/`, `dist/`, `.env`)

## 📄 License

Research project - Florida Institute of Technology

## 🔗 Related Files

- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Technical implementation details
- [README_UNIFIED.md](README_UNIFIED.md) - Additional documentation
- [QUICKSTART.md](QUICKSTART.md) - Detailed setup instructions
