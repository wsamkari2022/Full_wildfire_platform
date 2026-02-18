# 📋 Production Deployment Checklist

Use this checklist to ensure you complete all necessary steps for deploying to moonlander.fit.edu/my_experiment

## Before You Start

- [ ] Read [PRODUCTION_SUMMARY.md](./PRODUCTION_SUMMARY.md) to understand what was changed
- [ ] Read [PRODUCTION_QUICKSTART.md](./PRODUCTION_QUICKSTART.md) for quick reference
- [ ] Have SSH access to moonlander.fit.edu server

---

## ☑️ Step 1: Server Setup

### MongoDB Installation

- [ ] MongoDB is installed on the server
  ```bash
  mongod --version
  ```
- [ ] MongoDB is running
  ```bash
  sudo systemctl status mongodb
  ```
- [ ] MongoDB database created
  ```bash
  mongosh
  use wildfire_study
  show collections
  ```

### Node.js Installation

- [ ] Node.js v18+ is installed
  ```bash
  node --version  # Should be v18 or higher
  ```
- [ ] npm is installed
  ```bash
  npm --version
  ```

---

## ☑️ Step 2: Project Setup

### Upload Project

- [ ] Project files uploaded to server
  ```bash
  ls /path/to/your/project
  ```

### Install Dependencies

- [ ] Root dependencies installed
  ```bash
  npm install
  ```
- [ ] Backend dependencies installed
  ```bash
  cd backend && npm install && cd ..
  ```

---

## ☑️ Step 3: Configuration

### Backend Environment

- [ ] Created backend/.env file
  ```bash
  cp backend/.env.production backend/.env
  ```
- [ ] Configured MongoDB connection in backend/.env
  ```env
  MONGODB_URI=mongodb://localhost:27017/wildfire_study
  ```
  **⚠️ CRITICAL: Set this to your actual MongoDB connection string**

- [ ] Set NODE_ENV to production
  ```env
  NODE_ENV=production
  ```
- [ ] Configured PORT (default 4000 is fine)
  ```env
  PORT=4000
  ```

### Frontend Environment (Optional)

- [ ] Verified .env.production has VITE_API_URL empty (for relative paths)
  ```env
  VITE_API_URL=
  ```

---

## ☑️ Step 4: Build

### Build Application

- [ ] Frontend built successfully
  ```bash
  npm run build:frontend
  ```
  **Expected**: dist/ folder created with index.html and assets/

- [ ] Backend built successfully
  ```bash
  npm run build:backend
  ```
  **Expected**: backend/dist/ folder created with server.js

- [ ] Both built together
  ```bash
  npm run build:all
  ```

### Verify Build

- [ ] dist/index.html exists
- [ ] dist/assets/ folder exists with JS and CSS files
- [ ] backend/dist/server.js exists
- [ ] backend/dist/ has config/, models/, and routes/ folders

---

## ☑️ Step 5: Test Locally

### Start Production Server

- [ ] Server starts without errors
  ```bash
  npm run start:prod
  ```
  **Expected output**:
  ```
  🚀 Server running in production mode
  📡 API available at http://localhost:4000/my_experiment/api
  🌐 Web app available at http://localhost:4000/my_experiment
  💚 Health check at http://localhost:4000/health
  ```

### Verify Endpoints

- [ ] Health check works
  ```bash
  curl http://localhost:4000/health
  ```
  **Expected**: `{"status":"ok","timestamp":"..."}`

- [ ] Frontend loads
  ```bash
  curl http://localhost:4000/my_experiment
  ```
  **Expected**: HTML with "Wildfire Decision Simulation"

- [ ] API endpoint responds
  ```bash
  curl http://localhost:4000/my_experiment/api/user-sessions
  ```

---

## ☑️ Step 6: Process Management

### Install PM2

- [ ] PM2 installed globally
  ```bash
  npm install -g pm2
  ```

### Start with PM2

- [ ] Server started with PM2
  ```bash
  cd backend
  pm2 start dist/server.js --name wildfire-study
  ```
- [ ] PM2 process list saved
  ```bash
  pm2 save
  ```
- [ ] PM2 configured to start on boot
  ```bash
  pm2 startup
  # Follow the instructions shown
  ```

### Verify PM2

- [ ] Process is running
  ```bash
  pm2 status
  ```
  **Expected**: wildfire-study status "online"

- [ ] Logs are clean (no errors)
  ```bash
  pm2 logs wildfire-study --lines 50
  ```

---

## ☑️ Step 7: Reverse Proxy Configuration

### Apache Configuration

- [ ] Apache modules enabled
  ```bash
  sudo a2enmod proxy
  sudo a2enmod proxy_http
  sudo a2enmod rewrite
  ```

- [ ] Virtual host configured

  Edit `/etc/apache2/sites-available/moonlander.conf`:
  ```apache
  ProxyPass /my_experiment http://localhost:4000/my_experiment
  ProxyPassReverse /my_experiment http://localhost:4000/my_experiment
  ProxyPass /health http://localhost:4000/health
  ProxyPassReverse /health http://localhost:4000/health
  ```

- [ ] Apache configuration tested
  ```bash
  sudo apache2ctl configtest
  ```
  **Expected**: "Syntax OK"

- [ ] Apache restarted
  ```bash
  sudo systemctl restart apache2
  ```

### OR Nginx Configuration

- [ ] Nginx configured

  Edit `/etc/nginx/sites-available/moonlander`:
  ```nginx
  location /my_experiment {
      proxy_pass http://localhost:4000;
      proxy_http_version 1.1;
      proxy_set_header Host $host;
  }
  ```

- [ ] Nginx configuration tested
  ```bash
  sudo nginx -t
  ```

- [ ] Nginx reloaded
  ```bash
  sudo systemctl reload nginx
  ```

---

## ☑️ Step 8: Public Verification

### Test Public URLs

- [ ] Homepage loads

  Visit: `http://moonlander.fit.edu/my_experiment`

  **Expected**: Demographic consent page

- [ ] Health endpoint works
  ```bash
  curl http://moonlander.fit.edu/health
  ```

- [ ] Navigation works

  Click through pages, verify routes work

- [ ] Page refresh works

  Refresh page at any route (shouldn't get 404)

### Test Complete Flow

- [ ] Complete demographic form
- [ ] Submit form
- [ ] Check MongoDB for data
  ```bash
  mongosh
  use wildfire_study
  db.usersessions.find().pretty()
  ```
  **Expected**: See the session data you just submitted

---

## ☑️ Step 9: Security & Monitoring

### Security

- [ ] Firewall configured (only expose 80/443, keep 4000 internal)
- [ ] MongoDB authentication enabled (recommended)
- [ ] SSL certificate installed for HTTPS (recommended)
- [ ] CORS origins verified in backend/src/server.ts

### Monitoring

- [ ] Set up PM2 monitoring
  ```bash
  pm2 monitor
  ```
- [ ] Configure MongoDB backups
- [ ] Set up log rotation for PM2

---

## ☑️ Step 10: Final Checks

### Performance

- [ ] Static assets load quickly
- [ ] No console errors in browser
- [ ] API responses are fast (<1 second)

### Functionality

- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Data saves to MongoDB
- [ ] Navigation works throughout the app

### Documentation

- [ ] Save deployment date and configuration
- [ ] Document any custom settings
- [ ] Keep backup of .env file (securely!)

---

## 🎉 Deployment Complete!

Your application is now live at:

**https://moonlander.fit.edu/my_experiment**

### Post-Deployment Commands

```bash
# Check server status
pm2 status

# View logs
pm2 logs wildfire-study

# Restart server
pm2 restart wildfire-study

# Check MongoDB
mongosh
use wildfire_study
db.usersessions.countDocuments()

# Update application
git pull  # or upload new files
npm run build:all
pm2 restart wildfire-study
```

### Need Help?

- 📖 [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) - Full guide
- 🚀 [PRODUCTION_QUICKSTART.md](./PRODUCTION_QUICKSTART.md) - Quick reference
- 📝 [PRODUCTION_SUMMARY.md](./PRODUCTION_SUMMARY.md) - What changed

---

**Date Deployed**: _________________

**Deployed By**: _________________

**MongoDB URI**: _________________ (keep secure!)

**Port**: _________________

**Notes**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
