# Production Deployment Guide

This guide will help you deploy the Wildfire Study application to moonlander.fit.edu/my_experiment

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [MongoDB Setup](#mongodb-setup)
4. [Build the Application](#build-the-application)
5. [Server Configuration](#server-configuration)
6. [Deployment](#deployment)
7. [Verification](#verification)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The application will be deployed at:
- **Frontend & API**: `moonlander.fit.edu/my_experiment`
- **API Endpoints**: `moonlander.fit.edu/my_experiment/api/*`
- **Health Check**: `moonlander.fit.edu/health`

The architecture consists of:
- React SPA (built with Vite) served as static files
- Express.js backend serving both API and static files
- MongoDB for data persistence

---

## ✅ Prerequisites

Before deploying, ensure you have:

- [ ] Node.js v18 or higher installed on the server
- [ ] MongoDB installed and running (or MongoDB Atlas account)
- [ ] Access to the moonlander.fit.edu server (SSH/FTP)
- [ ] npm installed

---

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB (Recommended for Testing)

1. **Install MongoDB** on your server:
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb

   # CentOS/RHEL
   sudo yum install mongodb

   # macOS
   brew install mongodb-community
   ```

2. **Start MongoDB**:
   ```bash
   sudo systemctl start mongodb
   sudo systemctl enable mongodb  # Auto-start on boot
   ```

3. **Verify MongoDB is running**:
   ```bash
   mongosh
   # You should see the MongoDB shell prompt
   ```

4. **Create the database**:
   ```bash
   mongosh
   use wildfire_study
   db.createCollection("usersessions")
   exit
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with password
4. Whitelist your server's IP address
5. Get the connection string (looks like: `mongodb+srv://...`)

---

## 🔨 Build the Application

### Step 1: Clone/Upload Your Project

Upload your project to the server or clone from git:
```bash
cd /path/to/your/project
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 3: Configure Environment Variables

#### Frontend Environment (.env.production)

The `.env.production` file is already configured for production with relative paths.

**No changes needed** unless your API is on a different server.

#### Backend Environment (backend/.env)

Create `backend/.env` from the template:

```bash
cp backend/.env.production backend/.env
```

Edit `backend/.env` and configure:

```env
# REQUIRED: Set your environment
NODE_ENV=production

# REQUIRED: Set your port (default is fine for most cases)
PORT=4000

# REQUIRED: Configure your MongoDB connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/wildfire_study

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wildfire_study

# For MongoDB with authentication:
# MONGODB_URI=mongodb://username:password@localhost:27017/wildfire_study
```

### Step 4: Build Everything

```bash
# Build both frontend and backend
npm run build:all
```

This will:
1. Compile TypeScript frontend code
2. Build React app with Vite → creates `dist/` folder
3. Compile TypeScript backend code → creates `backend/dist/` folder

### Step 5: Verify Build Output

Check that the build succeeded:
```bash
# Should contain index.html and assets/
ls -la dist/

# Should contain server.js and other compiled files
ls -la backend/dist/
```

---

## 🖥️ Server Configuration

### Option 1: Run as a Standalone Service (Simple)

This is the simplest approach for testing or small deployments.

1. **Test the production build locally**:
   ```bash
   npm run start:prod
   ```

2. **You should see**:
   ```
   🚀 Server running in production mode
   📡 API available at http://localhost:4000/my_experiment/api
   🌐 Web app available at http://localhost:4000/my_experiment
   💚 Health check at http://localhost:4000/health
   ```

3. **Keep the server running** with PM2 (process manager):
   ```bash
   # Install PM2 globally
   npm install -g pm2

   # Start the server with PM2
   cd backend
   pm2 start dist/server.js --name wildfire-study

   # Save PM2 process list
   pm2 save

   # Configure PM2 to start on boot
   pm2 startup
   ```

4. **PM2 useful commands**:
   ```bash
   pm2 status              # Check status
   pm2 logs wildfire-study # View logs
   pm2 restart wildfire-study  # Restart
   pm2 stop wildfire-study     # Stop
   ```

### Option 2: Behind Apache (Recommended for Production)

If moonlander.fit.edu already uses Apache, configure it as a reverse proxy.

1. **Enable Apache modules**:
   ```bash
   sudo a2enmod proxy
   sudo a2enmod proxy_http
   sudo a2enmod rewrite
   ```

2. **Create/Edit Apache virtual host configuration**:

   Edit your Apache config (e.g., `/etc/apache2/sites-available/moonlander.conf`):

   ```apache
   <VirtualHost *:80>
       ServerName moonlander.fit.edu

       # Existing configuration for the main site...

       # Proxy configuration for /my_experiment
       ProxyPreserveHost On
       ProxyPass /my_experiment http://localhost:4000/my_experiment
       ProxyPassReverse /my_experiment http://localhost:4000/my_experiment

       # Health check endpoint
       ProxyPass /health http://localhost:4000/health
       ProxyPassReverse /health http://localhost:4000/health
   </VirtualHost>
   ```

3. **Restart Apache**:
   ```bash
   sudo systemctl restart apache2
   ```

### Option 3: Behind Nginx (Alternative)

If using Nginx instead of Apache:

1. **Edit Nginx configuration** (e.g., `/etc/nginx/sites-available/moonlander`):

   ```nginx
   server {
       listen 80;
       server_name moonlander.fit.edu;

       # Existing configuration...

       # Proxy configuration for /my_experiment
       location /my_experiment {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }

       # Health check
       location /health {
           proxy_pass http://localhost:4000;
       }
   }
   ```

2. **Test and reload Nginx**:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## 🚀 Deployment

### Quick Deployment Checklist

1. ✅ MongoDB is running and accessible
2. ✅ Dependencies are installed (`npm install` in root and backend)
3. ✅ Environment variables are configured (`backend/.env`)
4. ✅ Application is built (`npm run build:all`)
5. ✅ Backend server is running (via PM2 or systemd)
6. ✅ Reverse proxy is configured (if using Apache/Nginx)

### Start the Application

**Using PM2 (Recommended)**:
```bash
cd backend
pm2 start dist/server.js --name wildfire-study -i 1
pm2 save
```

**Or using npm script**:
```bash
npm run start:prod
```

**Or using systemd (for automatic restart)**:

Create `/etc/systemd/system/wildfire-study.service`:
```ini
[Unit]
Description=Wildfire Study Application
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/path/to/project/backend
Environment="NODE_ENV=production"
ExecStart=/usr/bin/node dist/server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl enable wildfire-study
sudo systemctl start wildfire-study
sudo systemctl status wildfire-study
```

---

## ✔️ Verification

### 1. Check Server is Running

```bash
# Check if the server is listening
netstat -tulpn | grep 4000

# Or
lsof -i :4000
```

### 2. Test Health Endpoint

```bash
curl http://localhost:4000/health
```

Expected response:
```json
{"status":"ok","timestamp":"2026-02-06T..."}
```

### 3. Test API Endpoint

```bash
curl http://localhost:4000/my_experiment/api/user-sessions
```

### 4. Test Frontend

Visit in browser:
- `http://moonlander.fit.edu/my_experiment`

You should see the demographics page.

### 5. Test Database Connection

```bash
mongosh
use wildfire_study
show collections
# You should see: usersessions, baselinevalues, etc.
```

### 6. Complete a Test Session

1. Go to `moonlander.fit.edu/my_experiment`
2. Fill out the demographic form
3. Check MongoDB:
   ```bash
   mongosh
   use wildfire_study
   db.usersessions.find().pretty()
   ```

---

## 🐛 Troubleshooting

### Issue: Can't access the site at moonlander.fit.edu/my_experiment

**Check:**
1. Is the backend server running?
   ```bash
   pm2 status
   # or
   sudo systemctl status wildfire-study
   ```

2. Is the reverse proxy configured correctly?
   ```bash
   sudo apache2ctl configtest  # Apache
   sudo nginx -t               # Nginx
   ```

3. Check server logs:
   ```bash
   pm2 logs wildfire-study
   # or
   sudo journalctl -u wildfire-study -f
   ```

### Issue: API calls return 404

**Check:**
1. Verify the API base path in the backend server is `/my_experiment`
2. Check `backend/src/server.ts` - the BASE_PATH should be `/my_experiment`
3. Restart the server after any changes

### Issue: Database connection failed

**Check:**
1. Is MongoDB running?
   ```bash
   sudo systemctl status mongodb
   ```

2. Check the connection string in `backend/.env`
3. Test connection manually:
   ```bash
   mongosh "your-connection-string"
   ```

4. Check backend logs for specific error:
   ```bash
   pm2 logs wildfire-study
   ```

### Issue: Static files (CSS, JS) not loading

**Check:**
1. Did you run `npm run build:all`?
2. Does the `dist/` folder exist with `index.html` and `assets/`?
3. Check browser console for 404 errors
4. Verify the Vite base path is set to `/my_experiment/`

### Issue: Page refreshes cause 404

This means the SPA fallback isn't working.

**Fix:** Make sure in `backend/src/server.ts`, this route exists:
```javascript
app.get(`${BASE_PATH}/*`, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});
```

### Issue: CORS errors in browser console

**Fix:** Update `backend/src/server.ts` CORS configuration to include your domain:
```javascript
app.use(cors({
  origin: ["https://moonlander.fit.edu", "http://moonlander.fit.edu"],
  credentials: true
}));
```

---

## 🔄 Updating the Application

When you need to update the application:

```bash
# 1. Stop the server
pm2 stop wildfire-study

# 2. Pull latest changes (if using git)
git pull

# 3. Install any new dependencies
npm install
cd backend && npm install && cd ..

# 4. Rebuild
npm run build:all

# 5. Restart the server
pm2 restart wildfire-study

# 6. Check logs
pm2 logs wildfire-study
```

---

## 📊 Monitoring

### View Logs

```bash
# PM2 logs
pm2 logs wildfire-study

# Systemd logs
sudo journalctl -u wildfire-study -f

# Apache logs
sudo tail -f /var/log/apache2/error.log
```

### Monitor Database

```bash
mongosh
use wildfire_study
db.usersessions.countDocuments()
db.sessionmetrics.countDocuments()
```

---

## 🔒 Security Recommendations

1. **Use HTTPS**: Configure SSL certificate for moonlander.fit.edu
2. **Firewall**: Only expose port 80/443, keep MongoDB port 27017 internal
3. **MongoDB Authentication**: Enable auth and create a dedicated user
4. **Regular Backups**: Set up automated MongoDB backups
5. **Update Dependencies**: Keep Node.js and npm packages updated
6. **Environment Variables**: Never commit `.env` files to git

---

## 📞 Support

For issues specific to:
- **MongoDB**: https://www.mongodb.com/docs/
- **PM2**: https://pm2.keymetrics.io/docs/
- **Apache**: https://httpd.apache.org/docs/
- **Nginx**: https://nginx.org/en/docs/

---

## 📝 Quick Reference Commands

```bash
# Build and deploy
npm run build:all
pm2 restart wildfire-study

# Check status
pm2 status
curl http://localhost:4000/health

# View logs
pm2 logs wildfire-study

# Database
mongosh
use wildfire_study
show collections

# Restart services
pm2 restart wildfire-study
sudo systemctl restart apache2
sudo systemctl restart mongodb
```

---

**Deployment Complete! 🎉**

Your application should now be live at: `https://moonlander.fit.edu/my_experiment`
