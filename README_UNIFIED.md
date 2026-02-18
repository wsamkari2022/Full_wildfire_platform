# VRDS Unified Platform - All Experiments on Port 4000

## 🚀 What's New

Your VRDS platform has been restructured to run all experiments on a **single port (4000)** with a unified backend server. This replaces the previous multi-port architecture and provides:

- ✅ **Single Port**: Everything runs on port 4000
- ✅ **Unified Backend**: One Node.js server for all experiments
- ✅ **Shared Database**: MongoDB connection pooling across experiments
- ✅ **Easier Deployment**: One service to manage instead of 5
- ✅ **Better Monitoring**: Centralized logging and health checks
- ✅ **Ready for Growth**: Easy to add APA_ONLY and BASELINE experiments

## 📋 Quick Links

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[Architecture Documentation](UNIFIED_ARCHITECTURE.md)** - Detailed system design
- **[Adding Experiments Guide](ADDING_NEW_EXPERIMENT.md)** - Step-by-step for new experiments

## 🏗️ Architecture Overview

### Before (Multi-Port)
```
Landing Page → Port 3999
CVR_APA     → Port 4001
CVR_ONLY    → Port 4002
APA_ONLY    → Port 4003
BASELINE    → Port 4004
```

### After (Unified Port)
```
Port 4000 → Everything
  ├── / (Landing Page)
  ├── /VRDS_CVR_APA (CVR_APA)
  ├── /VRDS_CVR (CVR_ONLY)
  ├── /VRDS_APA (APA_ONLY - prepared)
  └── /VRDS_BASELINE (BASELINE - prepared)
```

## 🚦 Getting Started

### Development Mode (Quickest)
```bash
# Start all services at once
./dev-all.sh
```

Access:
- Landing: http://localhost:4000/
- CVR_APA: http://localhost:4000/VRDS_CVR_APA (or port 5173 for HMR)
- CVR_ONLY: http://localhost:4000/VRDS_CVR (or port 5174 for HMR)

### Production Deployment
```bash
# 1. Build everything
./build-all.sh

# 2. Configure environment
cd unified-backend
cp .env.example .env
nano .env  # Set your MongoDB URI

# 3. Start server
cd ..
./start-unified.sh
```

## 📁 Project Structure

```
wildfire-platform/
├── unified-backend/           ⭐ NEW: Unified server
│   ├── src/
│   │   ├── server.ts         # Main server (port 4000)
│   │   ├── config/           # Database config
│   │   ├── models/           # Shared Mongoose models
│   │   ├── routes/           # Experiment routes
│   │   │   ├── cvr_apa/     # CVR_APA APIs
│   │   │   ├── cvr_only/    # CVR_ONLY APIs
│   │   │   ├── apa_only/    # Placeholder
│   │   │   └── baseline/    # Placeholder
│   │   └── middleware/       # Logging, etc.
│   ├── public/               # Built frontends
│   │   ├── cvr_apa/
│   │   └── cvr_only/
│   └── dist/                 # Compiled backend
│
├── ProdFiles/
│   ├── CVR_APA.../           # CVR_APA React app
│   └── CVR_ONLY.../          # CVR_ONLY React app
│
├── build-all.sh              ⭐ Build everything
├── start-unified.sh          ⭐ Start production
├── dev-all.sh                ⭐ Development mode
├── QUICKSTART.md             📖 Quick start guide
├── UNIFIED_ARCHITECTURE.md   📖 Architecture docs
└── ADDING_NEW_EXPERIMENT.md  📖 Adding experiments
```

## 🔧 Configuration

### Environment Variables (`unified-backend/.env`)
```bash
PORT=4000                                        # Server port
NODE_ENV=development                             # Environment
MONGODB_URI=mongodb://localhost:27017/wildfire_study  # Database
ACTIVE_EXPERIMENTS=CVR_APA,CVR_ONLY             # Active experiments
```

### Frontend Configuration
No `.env` required! Frontends use:
- Relative API paths (`/VRDS_CVR_APA/api/*`)
- Vite proxy in development
- Path-based routing

## 🎯 Key Features

### Landing Page
- Random experiment assignment
- Preserves query parameters (PROLIFIC_PID, etc.)
- Beautiful animated UI
- Accessible at `/` and `/landingpage`

### Unified Backend
- Single Express server
- Path-based routing for experiments
- Shared MongoDB connection
- Request logging with experiment context
- Health checks per experiment
- Production-ready with security headers

### Database Organization
All experiments share MongoDB with:
- Same collections (user_sessions, final_decisions, etc.)
- `experiment_condition` field identifies experiment
- Efficient connection pooling
- Automatic reconnection handling

## 📊 Monitoring

### Health Checks
```bash
# Global health
curl http://localhost:4000/health

# Experiment-specific
curl http://localhost:4000/VRDS_CVR_APA/api/health
curl http://localhost:4000/VRDS_CVR/api/health

# List all experiments
curl http://localhost:4000/api/experiments
```

### Logs
Request logs show:
```
[2024-02-18T20:00:00.000Z] CVR_APA POST /VRDS_CVR_APA/api/user-sessions 201 45ms
[2024-02-18T20:00:05.000Z] CVR_ONLY GET /VRDS_CVR/api/health 200 3ms
```

### MongoDB Monitoring
```javascript
// Check session distribution
db.user_sessions.aggregate([
  { $group: { _id: "$experiment_condition", count: { $sum: 1 } } }
])
```

## 🔐 Security

### Development
- CORS allows localhost on various ports
- Detailed error messages
- Source maps available

### Production
- CORS restricted to moonlander.fit.edu
- Security headers enabled
- Error details hidden
- No source maps

## 🧪 Testing

### Manual Testing
```bash
# Start dev mode
./dev-all.sh

# Test landing page
open http://localhost:4000/

# Test random assignment (run multiple times)
curl http://localhost:4000/assign

# Test experiments directly
open http://localhost:4000/VRDS_CVR_APA
open http://localhost:4000/VRDS_CVR
```

### Database Testing
```javascript
mongosh wildfire_study

// Check recent sessions
db.user_sessions.find().sort({created_at: -1}).limit(5)

// Count by experiment
db.user_sessions.aggregate([
  { $group: { _id: "$experiment_condition", count: { $sum: 1 } } }
])
```

## 📦 Dependencies

### Backend (unified-backend)
- express - Web server
- mongoose - MongoDB ODM
- cors - Cross-origin requests
- dotenv - Environment variables

### Frontend (CVR_APA, CVR_ONLY)
- react - UI framework
- react-router-dom - Routing
- chart.js - Visualizations
- tailwindcss - Styling

## 🔄 Adding APA_ONLY and BASELINE

Ready to add back the other experiments? Follow these steps:

1. **Read the Guide**: `ADDING_NEW_EXPERIMENT.md`
2. **Prepare Frontend**: Update vite.config.ts
3. **Create Routes**: Copy and customize from CVR_APA
4. **Register**: Add to server.ts
5. **Update Scripts**: Modify build-all.sh and dev-all.sh
6. **Test**: Use dev mode first
7. **Deploy**: Build and start production

The infrastructure is ready - just follow the documented process!

## 🐛 Troubleshooting

### Port Already in Use
```bash
lsof -ti TCP:4000 | xargs kill -9
```

### MongoDB Connection Failed
```bash
# Check MongoDB is running
mongosh

# Test connection
mongosh mongodb://localhost:27017/wildfire_study
```

### Frontend 404 Errors
```bash
# Verify builds exist
ls -la unified-backend/public/

# Rebuild
./build-all.sh
```

### API Errors
- Check server is running on 4000
- Verify MongoDB connection
- Check server logs
- Test with curl

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started quickly
- **[UNIFIED_ARCHITECTURE.md](UNIFIED_ARCHITECTURE.md)** - System architecture
- **[ADDING_NEW_EXPERIMENT.md](ADDING_NEW_EXPERIMENT.md)** - Adding experiments

## 🎓 Learning Resources

### Understanding the Flow
1. User visits landing page (port 4000)
2. Clicks "Begin Study"
3. Backend assigns random experiment
4. User redirected to experiment path
5. Frontend app loads from public/
6. API calls go to experiment-specific routes
7. Data saves to MongoDB with experiment tag

### Key Concepts
- **Path-based routing**: Different paths, same port
- **Shared resources**: One database, one server
- **Experiment isolation**: Separate routes, same models
- **Production readiness**: Build once, deploy anywhere

## 🚀 Performance

### Benefits
- **Memory**: ~80% reduction (1 process vs 5)
- **Connections**: Shared MongoDB pool
- **Deployment**: Single service
- **Monitoring**: Centralized logs

### Optimization Tips
- Use PM2 for clustering
- Enable MongoDB indexes
- Add Redis for caching
- Implement rate limiting
- Use CDN for static assets

## 🤝 Contributing

When adding or modifying experiments:
1. Follow existing patterns
2. Update documentation
3. Test in development mode
4. Build and test production
5. Update scripts if needed

## 📞 Support

For issues:
1. Check documentation
2. Review logs
3. Test in development mode
4. Verify configuration
5. Check MongoDB connection

## 📝 Changelog

### Version 1.0.0 - Unified Architecture
- ✨ Unified all experiments on port 4000
- ✨ Created shared backend server
- ✨ Centralized MongoDB connection
- ✨ Added comprehensive logging
- ✨ Prepared infrastructure for all 4 experiments
- 📚 Created extensive documentation
- 🔧 Automated build and deployment scripts

### Coming Soon
- APA_ONLY experiment integration
- BASELINE experiment integration
- Enhanced monitoring dashboard
- Automated testing suite

## 🎉 Success!

Your VRDS platform is now running on a unified architecture:

```
✅ Port 4000 - Single entry point
✅ Unified Backend - Shared server
✅ MongoDB - Centralized database
✅ CVR_APA - Active
✅ CVR_ONLY - Active
✅ APA_ONLY - Ready to add
✅ BASELINE - Ready to add
✅ Documentation - Comprehensive
✅ Scripts - Automated
✅ Production Ready - Yes!
```

**Get started now**: `./dev-all.sh`

---

**Platform Version**: 1.0.0
**Port**: 4000
**Active Experiments**: CVR_APA, CVR_ONLY
**Database**: MongoDB
**Status**: Production Ready ✅
