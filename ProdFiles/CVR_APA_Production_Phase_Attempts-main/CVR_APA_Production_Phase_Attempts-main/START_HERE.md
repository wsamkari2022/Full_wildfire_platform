# 🚀 START HERE - Production Deployment Guide

Your project has been successfully converted to a production-ready build! 🎉

## 📚 Where to Start

### 1️⃣ First, Read This

**[PRODUCTION_SUMMARY.md](./PRODUCTION_SUMMARY.md)** - Start here to understand what was changed and how the production setup works.

### 2️⃣ Quick Deployment (5 Minutes)

**[PRODUCTION_QUICKSTART.md](./PRODUCTION_QUICKSTART.md)** - Follow this if you want to deploy quickly and already know what you're doing.

### 3️⃣ Complete Guide (Recommended)

**[PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)** - Comprehensive step-by-step guide with troubleshooting, security tips, and monitoring setup.

### 4️⃣ Deployment Checklist

**[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Print this and check off each step as you complete your deployment.

---

## ⚡ Super Quick Start

If you just want to test locally right now:

```bash
# 1. Install dependencies
npm install
cd backend && npm install && cd ..

# 2. Configure MongoDB connection
cp backend/.env.production backend/.env
nano backend/.env  # Edit MONGODB_URI line

# 3. Build everything
npm run build:all

# 4. Start production server
npm run start:prod
```

Visit: http://localhost:4000/my_experiment

---

## 🎯 Your Deployment Target

This application is configured to deploy at:

**https://moonlander.fit.edu/my_experiment**

- Frontend will be at: `/my_experiment`
- API will be at: `/my_experiment/api/*`
- Health check at: `/health`

---

## 📋 What You MUST Configure

### ⚠️ CRITICAL: MongoDB Connection

Before deployment, you MUST configure your MongoDB connection in `backend/.env`:

```bash
cp backend/.env.production backend/.env
nano backend/.env
```

Set this line:
```env
MONGODB_URI=mongodb://localhost:27017/wildfire_study
```

Replace with your actual MongoDB connection string.

---

## 🔑 Key Files Modified

All the necessary changes have been made:

- ✅ `vite.config.ts` - Base path configured
- ✅ `src/App.tsx` - Router basename set
- ✅ `backend/src/server.ts` - Static serving & API routes configured
- ✅ `package.json` - Production build scripts added
- ✅ Environment files created with documentation

---

## 📦 What's Ready

- ✅ Production build configuration
- ✅ Subpath routing (/my_experiment)
- ✅ Static file serving
- ✅ API endpoints
- ✅ Environment templates
- ✅ Complete documentation
- ✅ Deployment checklist

## 🆘 Need Help?

1. Check [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) - Troubleshooting section
2. Review [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Step-by-step
3. Read [PRODUCTION_SUMMARY.md](./PRODUCTION_SUMMARY.md) - What changed

---

## 📞 Common Issues & Quick Fixes

| Problem | Solution |
|---------|----------|
| Can't build | Run `npm install` first |
| MongoDB error | Configure `backend/.env` with correct URI |
| Port already in use | Change PORT in `backend/.env` |
| Can't access /my_experiment | Configure reverse proxy (see deployment guide) |

---

**Ready? Start with [PRODUCTION_SUMMARY.md](./PRODUCTION_SUMMARY.md)** 📖

Good luck with your deployment! 🚀
