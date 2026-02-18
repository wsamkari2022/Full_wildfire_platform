# VRDS_APA Production Configuration Checklist

## ✅ Completed Configuration Changes

### Backend Configuration

- [x] **ES Modules Support**
  - Updated `backend/tsconfig.json` to use `"module": "ES2020"`
  - Added `.js` extensions to ALL import statements in backend files
  - File: `backend/tsconfig.json:4`

- [x] **Base Path Configuration**
  - Set `BASE_PATH = "/VRDS_APA"` in server.ts
  - All API routes mounted under `/VRDS_APA/api/*`
  - Health check endpoint at `/VRDS_APA/health`
  - File: `backend/src/server.ts:23-24`

- [x] **Port Configuration**
  - Backend port changed from 4000 to 4003
  - File: `backend/src/server.ts:21`

- [x] **Static File Serving**
  - Express serves frontend static files from `dist/` folder
  - SPA fallback routing configured for React Router
  - Only active when `NODE_ENV=production`
  - File: `backend/src/server.ts:48-54`

- [x] **CORS Configuration**
  - Production: `moonlander.fit.edu` (HTTP & HTTPS)
  - Development: `localhost:3003`, `localhost:5173`
  - File: `backend/src/server.ts:27-32`

- [x] **All Route Files Updated**
  - ✅ userSessions.ts
  - ✅ valueEvolution.ts
  - ✅ cvrResponses.ts
  - ✅ apaReorderings.ts
  - ✅ finalDecisions.ts
  - ✅ sessionMetrics.ts
  - ✅ sessionFeedback.ts
  - ✅ valueStability.ts
  - ✅ scenarioInteractions.ts
  - ✅ baselineValues.ts

### Frontend Configuration

- [x] **Vite Base Path**
  - Set `base: '/VRDS_APA/'` in vite.config.ts
  - File: `vite.config.ts:7`

- [x] **Development Port**
  - Set server port to 3003
  - File: `vite.config.ts:8-15`

- [x] **API Proxy**
  - Proxies `/VRDS_APA/api` to `http://localhost:4003`
  - File: `vite.config.ts:10-14`

- [x] **React Router Base Path**
  - Added `basename="/VRDS_APA"` to BrowserRouter
  - File: `src/App.tsx:54`

- [x] **API Service Configuration**
  - Updated `API` constant to use `/VRDS_APA` as fallback
  - File: `src/lib/mongoService.ts:1`

### Environment Variables

- [x] **Root `.env` (Frontend)**
  ```env
  VITE_PORT=3003
  VITE_API_URL=/VRDS_APA
  ```

- [x] **Backend `.env`**
  ```env
  MONGODB_URI=your_mongodb_connection_string_here
  PORT=4003
  NODE_ENV=development
  ```

### Package Scripts

- [x] **Build Scripts Added**
  - `npm run build:frontend` - Build frontend only
  - `npm run build:backend` - Build backend only
  - `npm run build:all` - Build both (backend → frontend)
  - `npm run start:prod` - Start production server

## 🔍 Path Consistency Verification

### Frontend API Calls
All frontend API calls go through mongoService.ts which uses:
```typescript
const API = "/VRDS_APA"
```

Example API call:
```typescript
fetch(`${API}/api/user-sessions`, {...})
// Resolves to: /VRDS_APA/api/user-sessions
```

### Backend API Routes
All backend routes are mounted under BASE_PATH:
```typescript
app.use(`${BASE_PATH}/api/user-sessions`, userSessionsRouter);
// Mounts to: /VRDS_APA/api/user-sessions
```

### React Router Paths
All React routes are under basename:
```typescript
<Router basename="/VRDS_APA">
  <Route path="/demographics" />
  // Resolves to: /VRDS_APA/demographics
</Router>
```

### Static Assets
All static assets (CSS, JS, images) are prefixed:
```html
<!-- Vite build output -->
<script src="/VRDS_APA/assets/index-[hash].js"></script>
<link href="/VRDS_APA/assets/index-[hash].css" />
```

## 🚀 Deployment Commands

### Quick Start (Development)
```bash
npm install
npm run dev:all
```
- Backend: http://localhost:4003/VRDS_APA/health
- Frontend: http://localhost:3003/VRDS_APA/

### Production Build
```bash
npm install
npm run build:all
```

### Production Start
```bash
# Update backend/.env with MongoDB connection string
npm run start:prod
```
- Server: http://localhost:4003/VRDS_APA/

## ✅ Testing Checklist

### Before Deployment

- [ ] MongoDB connection string is configured in `backend/.env`
- [ ] Run `npm run build:all` successfully completes
- [ ] Backend dist folder contains compiled JavaScript files
- [ ] Frontend dist folder contains index.html and assets
- [ ] All .js extensions are present in backend imports

### After Deployment

- [ ] Health check responds: `GET /VRDS_APA/health`
- [ ] API endpoints respond: `POST /VRDS_APA/api/user-sessions`
- [ ] Frontend loads at: `/VRDS_APA/`
- [ ] Frontend routes work: `/VRDS_APA/demographics`, `/VRDS_APA/tutorial`
- [ ] API calls from frontend work (check browser network tab)
- [ ] MongoDB connection successful (check backend logs)
- [ ] Assets load correctly (no 404s in browser console)
- [ ] "Begin Assessment" button saves data to MongoDB

## 🔧 MongoDB Connection

### Update Connection String

Edit `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vrds_apa?retryWrites=true&w=majority
```

Or for local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/vrds_apa
```

### Verify Connection

Start the server and look for:
```
✅ MongoDB connected
🚀 VRDS_APA API on http://localhost:4003/VRDS_APA
Environment: production
```

## 📊 Expected URL Patterns

### Development (npm run dev:all)

| Resource | URL |
|----------|-----|
| Frontend Dev | http://localhost:3003/VRDS_APA/ |
| Backend API | http://localhost:4003/VRDS_APA/api/* |
| Health Check | http://localhost:4003/VRDS_APA/health |

### Production (npm run start:prod)

| Resource | URL |
|----------|-----|
| Frontend App | http://moonlander.fit.edu/VRDS_APA/ |
| Backend API | http://moonlander.fit.edu/VRDS_APA/api/* |
| Health Check | http://moonlander.fit.edu/VRDS_APA/health |

## 🐛 Common Issues & Solutions

### Issue: "404 Not Found" on API calls

**Check:**
1. Backend is running: `ps aux | grep node`
2. Correct port: Backend should be on 4003
3. Path consistency: Frontend calls `/VRDS_APA/api/*`, backend expects `/VRDS_APA/api/*`

**Fix:**
```bash
# Restart backend
npm run start:prod
```

### Issue: Frontend routes not working (404)

**Check:**
1. `basename="/VRDS_APA"` in src/App.tsx
2. Express fallback route serving index.html

**Fix:** Ensure server.ts has:
```typescript
app.get(`${BASE_PATH}/*`, (_req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});
```

### Issue: Assets not loading (404)

**Check:**
1. Vite config has `base: '/VRDS_APA/'`
2. Build ran successfully: `npm run build:frontend`

**Fix:**
```bash
npm run build:all
```

### Issue: MongoDB connection error

**Check:**
1. `backend/.env` has correct `MONGODB_URI`
2. MongoDB server is accessible
3. Network allows connection to MongoDB

**Fix:** Update `backend/.env` with valid connection string

## 📝 Files Modified

### Backend Files (11 files)
- backend/tsconfig.json
- backend/src/server.ts
- backend/src/config/database.ts (imports only)
- backend/src/routes/*.ts (10 files)

### Frontend Files (3 files)
- vite.config.ts
- src/App.tsx
- src/lib/mongoService.ts

### Environment Files (3 files)
- .env
- .env.example
- backend/.env
- backend/.env.example

### Configuration Files (1 file)
- package.json

### Documentation (2 files)
- DEPLOYMENT.md
- PRODUCTION_CHECKLIST.md (this file)

## ✨ Key Features

- ✅ Production-ready build process
- ✅ ES Modules with proper .js extensions
- ✅ Single command deployment (`npm run build:all && npm run start:prod`)
- ✅ Consistent paths across frontend and backend
- ✅ SPA routing support
- ✅ MongoDB integration
- ✅ Health check endpoint
- ✅ Environment-based CORS
- ✅ Static file serving in production

## 🎯 Next Steps

1. Set MongoDB connection string in `backend/.env`
2. Run `npm run build:all`
3. Run `npm run start:prod`
4. Test health endpoint: `curl http://localhost:4003/VRDS_APA/health`
5. Open browser: http://localhost:4003/VRDS_APA/
6. Deploy to moonlander.fit.edu server
7. Configure reverse proxy (Nginx/Apache)
8. Set up process manager (PM2/systemd)
