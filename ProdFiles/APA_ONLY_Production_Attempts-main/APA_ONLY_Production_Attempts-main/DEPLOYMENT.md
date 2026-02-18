# VRDS_APA Production Deployment Guide

## Overview

This document provides comprehensive instructions for deploying the VRDS_APA project to production at **moonlander.fit.edu/VRDS_APA**.

## Project Configuration

### Base Path
- **Frontend**: `/VRDS_APA/`
- **Backend API**: `/VRDS_APA/api/*`
- **Health Check**: `/VRDS_APA/health`

### Ports
- **Backend**: Port 4003
- **Frontend Dev**: Port 3003

## Prerequisites

1. Node.js (v18 or higher)
2. npm (v9 or higher)
3. MongoDB connection string
4. Access to moonlander.fit.edu server

## Environment Setup

### 1. Backend Environment Variables

Create or update `backend/.env` with your production MongoDB connection string:

```env
MONGODB_URI=your_production_mongodb_connection_string
PORT=4003
NODE_ENV=production
```

### 2. Frontend Environment Variables

The root `.env` file is already configured for production:

```env
VITE_PORT=3003
VITE_API_URL=/VRDS_APA
```

## Build Process

### Build Everything

Run a single command to build both frontend and backend:

```bash
npm run build:all
```

This command:
1. Compiles backend TypeScript to JavaScript (ES modules) in `backend/dist/`
2. Builds frontend React app with Vite in `dist/`

### Build Separately (Optional)

```bash
# Build backend only
npm run build:backend

# Build frontend only
npm run build:frontend
```

## Deployment Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB

Update `backend/.env` with your production MongoDB connection string.

### 3. Build for Production

```bash
npm run build:all
```

### 4. Start Production Server

```bash
npm run start:prod
```

Or manually with environment variable:

```bash
NODE_ENV=production node backend/dist/server.js
```

The server will:
- Start on port 4003
- Mount API routes under `/VRDS_APA/api/*`
- Serve frontend static files from `/VRDS_APA/`
- Handle React Router SPA routing

## Server Configuration

### Nginx Configuration (Example)

If using Nginx as a reverse proxy:

```nginx
location /VRDS_APA {
    proxy_pass http://localhost:4003;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

### Apache Configuration (Example)

If using Apache as a reverse proxy:

```apache
ProxyPass /VRDS_APA http://localhost:4003/VRDS_APA
ProxyPassReverse /VRDS_APA http://localhost:4003/VRDS_APA
```

## Process Management

### Using PM2 (Recommended)

Install PM2 globally:

```bash
npm install -g pm2
```

Start the application:

```bash
pm2 start backend/dist/server.js --name vrds-apa --env production
```

Save PM2 configuration:

```bash
pm2 save
pm2 startup
```

Monitor the application:

```bash
pm2 logs vrds-apa
pm2 status
```

### Using systemd (Alternative)

Create a systemd service file `/etc/systemd/system/vrds-apa.service`:

```ini
[Unit]
Description=VRDS_APA Application
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/project
Environment=NODE_ENV=production
ExecStart=/usr/bin/node backend/dist/server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl enable vrds-apa
sudo systemctl start vrds-apa
sudo systemctl status vrds-apa
```

## Verification

### 1. Check Health Endpoint

```bash
curl http://localhost:4003/VRDS_APA/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "VRDS_APA API",
  "base": "/VRDS_APA/api"
}
```

### 2. Verify API Endpoints

```bash
# Test API endpoint
curl http://localhost:4003/VRDS_APA/api/user-sessions
```

### 3. Check Frontend

Navigate to: `http://moonlander.fit.edu/VRDS_APA`

## API Endpoints

All API endpoints are prefixed with `/VRDS_APA/api/`:

- POST `/VRDS_APA/api/user-sessions` - Create user session
- PATCH `/VRDS_APA/api/user-sessions/:id` - Update user session
- POST `/VRDS_APA/api/value-evolution` - Save value evolution
- POST `/VRDS_APA/api/scenario-interactions` - Save scenario interaction
- POST `/VRDS_APA/api/apa-reorderings` - Save APA reordering
- POST `/VRDS_APA/api/final-decisions` - Save final decision
- POST `/VRDS_APA/api/session-metrics` - Upsert session metrics
- POST `/VRDS_APA/api/session-feedback` - Upsert session feedback
- POST `/VRDS_APA/api/value-stability` - Upsert value stability
- POST `/VRDS_APA/api/cvr-responses` - Save CVR response
- GET `/VRDS_APA/api/baseline-values/session/:id` - Get baseline values
- POST `/VRDS_APA/api/baseline-values` - Create baseline values

## Troubleshooting

### Issue: API 404 Errors

**Solution**: Verify that:
1. Backend is running on port 4003
2. All API routes are prefixed with `/VRDS_APA/api/`
3. Frontend is making requests to `/VRDS_APA/api/`

### Issue: Frontend Routes Not Working

**Solution**: Verify that:
1. React Router has `basename="/VRDS_APA"` configured
2. Express serves index.html for all `/VRDS_APA/*` routes (excluding `/VRDS_APA/api/*`)
3. Vite build has `base: '/VRDS_APA/'` configured

### Issue: Assets Not Loading

**Solution**: Verify that:
1. Vite config has `base: '/VRDS_APA/'`
2. Build output is in `dist/` directory
3. Express static middleware is configured correctly

### Issue: MongoDB Connection Fails

**Solution**:
1. Check `backend/.env` has correct `MONGODB_URI`
2. Verify MongoDB server is accessible
3. Check MongoDB connection string format
4. Review backend logs for connection errors

## Development vs Production

### Development Mode

```bash
# Start backend dev server (port 4003)
npm run server

# Start frontend dev server (port 3003)
npm run dev

# Start both concurrently
npm run dev:all
```

In development:
- Frontend dev server proxies API requests to backend
- Hot module replacement enabled
- Source maps available

### Production Mode

```bash
# Build everything
npm run build:all

# Start production server
npm run start:prod
```

In production:
- Backend serves both API and static frontend files
- Optimized and minified assets
- No hot module replacement

## File Structure After Build

```
project/
├── dist/                      # Frontend build output
│   ├── index.html
│   └── assets/
│       ├── index-[hash].js
│       └── index-[hash].css
├── backend/
│   ├── dist/                  # Backend build output
│   │   ├── server.js
│   │   ├── config/
│   │   ├── models/
│   │   └── routes/
│   └── .env                   # Backend environment variables
└── .env                       # Frontend environment variables
```

## Security Considerations

1. **MongoDB Connection**: Never commit your MongoDB connection string to version control
2. **Environment Variables**: Keep `.env` files secure and out of git (they're in `.gitignore`)
3. **CORS**: Production CORS is configured for `moonlander.fit.edu` only
4. **Error Messages**: Production mode hides sensitive error details

## Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
```

### View Logs

```bash
# With PM2
pm2 logs vrds-apa

# With systemd
journalctl -u vrds-apa -f
```

### Restart Application

```bash
# With PM2
pm2 restart vrds-apa

# With systemd
sudo systemctl restart vrds-apa
```

## Support

For issues or questions, check the logs first:
- Backend logs show API requests and MongoDB operations
- Browser console shows frontend errors
- Network tab shows API call details
