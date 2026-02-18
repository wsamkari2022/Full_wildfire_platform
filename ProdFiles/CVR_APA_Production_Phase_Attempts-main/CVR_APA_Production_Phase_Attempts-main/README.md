# Wildfire Decision Simulation Interface

A research platform for studying moral decision-making in AI-assisted wildfire response scenarios.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Start development servers (frontend + backend)
npm run dev:all
```

Visit: http://localhost:5173

### Production

See **[PRODUCTION_QUICKSTART.md](./PRODUCTION_QUICKSTART.md)** for a 5-minute deployment guide.

See **[PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)** for comprehensive deployment documentation.

## 📁 Project Structure

```
project/
├── src/                    # Frontend React application
│   ├── pages/             # Page components
│   ├── components/        # Reusable components
│   ├── lib/              # Services (MongoDB client)
│   └── types/            # TypeScript types
├── backend/               # Express.js API server
│   └── src/
│       ├── models/       # MongoDB schemas
│       ├── routes/       # API routes
│       └── server.ts     # Main server file
├── dist/                  # Frontend build output (generated)
└── backend/dist/          # Backend build output (generated)
```

## 🛠️ Available Scripts

### Development
- `npm run dev` - Start frontend dev server
- `npm run server` - Start backend dev server
- `npm run dev:all` - Start both servers concurrently

### Production
- `npm run build:all` - Build frontend + backend
- `npm run start:prod` - Start production server
- `npm run production` - Build and start in one command

## 🔧 Configuration

### Development (.env)
```env
VITE_API_URL=http://localhost:4000
```

### Production (backend/.env)
```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb://localhost:27017/wildfire_study
```

## 📊 Database

The application uses MongoDB with the following collections:
- `usersessions` - User demographics and session data
- `baselinevalues` - Value assessments
- `scenariointeractions` - User interactions during scenarios
- `finaldecisions` - Final decisions for each scenario
- `sessionmetrics` - Calculated metrics and analytics
- `sessionfeedback` - User feedback
- And more...

## 🌐 Deployment

The application is designed to be deployed at: **moonlander.fit.edu/my_experiment**

Key deployment features:
- Single Node.js server serves both frontend and API
- Subpath routing configured for `/my_experiment`
- API available at `/my_experiment/api/*`
- MongoDB for data persistence
- PM2 for process management
- Apache/Nginx reverse proxy support

## 📖 Documentation

- [Production Deployment Guide](./PRODUCTION_DEPLOYMENT.md) - Complete deployment instructions
- [Production Quick Start](./PRODUCTION_QUICKSTART.md) - 5-minute deployment guide
- [MongoDB Migration Guide](./MONGODB_MIGRATION.md) - Database setup and migration info

## 🔒 Environment

Production deployment includes:
- Security headers (X-Frame-Options, CSP, etc.)
- CORS configuration
- Health check endpoint at `/health`
- Production-optimized builds
- Static asset serving

## 📝 License

Research use only.
