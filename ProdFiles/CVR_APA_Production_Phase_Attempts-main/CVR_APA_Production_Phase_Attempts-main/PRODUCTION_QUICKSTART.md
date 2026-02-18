# Production Quick Start Guide

This is a condensed version of the deployment guide for quick reference.

## 🚀 Quick Deploy (5 Minutes)

### 1. Install & Configure

```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Configure backend environment
cp backend/.env.production backend/.env
nano backend/.env  # Edit MongoDB connection string
```

### 2. Build

```bash
# Build everything
npm run build:all
```

### 3. Test Locally

```bash
# Start in production mode
npm run start:prod
```

Visit: `http://localhost:4000/my_experiment`

### 4. Deploy with PM2

```bash
# Install PM2
npm install -g pm2

# Start server
cd backend
pm2 start dist/server.js --name wildfire-study
pm2 save
pm2 startup  # Follow the instructions
```

### 5. Configure Reverse Proxy (Apache)

Add to your Apache config:

```apache
ProxyPass /my_experiment http://localhost:4000/my_experiment
ProxyPassReverse /my_experiment http://localhost:4000/my_experiment
```

Restart Apache:
```bash
sudo systemctl restart apache2
```

## ✅ Verification

```bash
# Check server
pm2 status

# Test health
curl http://localhost:4000/health

# Test frontend
curl http://localhost:4000/my_experiment
```

Visit: `http://moonlander.fit.edu/my_experiment`

## 📋 Environment Variables

**backend/.env** (Required):
```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb://localhost:27017/wildfire_study
```

**Frontend** (Already configured):
- Uses relative paths in production
- No additional configuration needed

## 🔧 Common Commands

```bash
# Rebuild and restart
npm run build:all && pm2 restart wildfire-study

# View logs
pm2 logs wildfire-study

# Stop server
pm2 stop wildfire-study

# Check MongoDB
mongosh
use wildfire_study
db.usersessions.find().pretty()
```

## 📖 Full Documentation

For detailed instructions, see [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't access site | Check if server is running: `pm2 status` |
| API 404 errors | Verify BASE_PATH in backend/src/server.ts |
| Database error | Check MongoDB is running: `sudo systemctl status mongodb` |
| Static files 404 | Rebuild: `npm run build:frontend` |
| CORS errors | Update origin in backend/src/server.ts |

## 🎯 File Structure

```
project/
├── dist/                          # Frontend build output
│   ├── index.html                 # Main HTML file
│   └── assets/                    # JS, CSS, images
├── backend/
│   ├── dist/                      # Backend build output
│   │   └── server.js             # Compiled server
│   ├── src/
│   │   └── server.ts             # Source code
│   └── .env                      # Backend config (YOU CREATE THIS)
├── .env.production                # Frontend config template
└── PRODUCTION_DEPLOYMENT.md       # Full guide
```

## 🔑 Key Configuration Points

1. **BASE_PATH**: Set to `/my_experiment` in `backend/src/server.ts` ✅
2. **Router basename**: Set to `/my_experiment` in `src/App.tsx` ✅
3. **Vite base**: Set to `/my_experiment/` in `vite.config.ts` ✅
4. **MongoDB**: Configure in `backend/.env` ⚠️ **YOU MUST DO THIS**

---

**Ready to deploy!** 🎉
