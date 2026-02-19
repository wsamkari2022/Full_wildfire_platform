# Project Dependencies - Quick Reference

## Required Software

### 1. Node.js & npm
**Version Required**: Node.js >= 18.0.0, npm >= 9.0.0

**Download**: https://nodejs.org/

**Installation**:
```bash
# macOS
brew install node

# Ubuntu/Debian
sudo apt update && sudo apt install nodejs npm

# Windows
Download installer from https://nodejs.org/
```

**Verify**:
```bash
node --version   # Should show v18+
npm --version    # Should show v9+
```

---

### 2. MongoDB
**Version Required**: >= 5.0.0

**Download**: https://www.mongodb.com/try/download/community

**Installation**:

**macOS**:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian**:
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Windows**:
- Download installer from https://www.mongodb.com/try/download/community
- Or use Chocolatey: `choco install mongodb`

**Verify**:
```bash
mongod --version  # Should show v5.0+
mongosh           # Should connect to MongoDB shell
```

---

## Project Dependencies

After installing Node.js and MongoDB, install project dependencies:

### 1. Unified Backend
```bash
cd unified-backend
npm install
```

**Key Dependencies**:
- express: ^4.19.2 (Web framework)
- mongoose: ^8.6.0 (MongoDB ODM)
- cors: ^2.8.5 (CORS middleware)
- dotenv: ^16.4.5 (Environment variables)
- typescript: ^5.0.0 (TypeScript compiler)
- tsx: ^4.7.0 (TypeScript execution)

### 2. CVR_APA Frontend
```bash
cd ProdFiles/CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main
npm install
```

**Key Dependencies**:
- react: ^18.3.1 (UI library)
- vite: ^5.4.2 (Build tool)
- tailwindcss: ^3.4.1 (CSS framework)
- typescript: ^5.5.3

### 3. CVR_ONLY Frontend
```bash
cd ProdFiles/CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main
npm install
```

**Key Dependencies**:
- react: ^18.3.1 (UI library)
- vite: ^5.4.2 (Build tool)
- tailwindcss: ^3.4.1 (CSS framework)
- typescript: ^5.5.3

---

## Environment Configuration

Create `.env` file in `unified-backend/`:

```bash
cd unified-backend
cp .env.example .env
```

Edit the `.env` file:
```bash
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/wildfire_study
```

---

## Quick Start Commands

### Start All Services (Manual)

**Terminal 1 - Backend**:
```bash
cd unified-backend
npm run dev
```

**Terminal 2 - CVR_APA**:
```bash
cd ProdFiles/CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main
npm run dev
```

**Terminal 3 - CVR_ONLY**:
```bash
cd ProdFiles/CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main
npm run dev
```

**Access**: http://localhost:4000/

---

## Optional Tools

### PM2 (Process Manager for Production)
```bash
npm install -g pm2
```

### MongoDB Compass (GUI for MongoDB)
Download from: https://www.mongodb.com/try/download/compass

---

## Troubleshooting

### Port Already in Use
```bash
# Find process
lsof -i :4000  # macOS/Linux
netstat -ano | findstr :4000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### MongoDB Not Starting
```bash
# macOS
brew services restart mongodb-community

# Ubuntu
sudo systemctl restart mongod

# Windows
net start MongoDB
```

### npm Install Fails
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## System Requirements Summary

| Component | Minimum Version | Purpose |
|-----------|----------------|---------|
| Node.js | 18.0.0 | JavaScript runtime |
| npm | 9.0.0 | Package manager |
| MongoDB | 5.0.0 | Database |
| Git | Any | Version control |

---

## Network Ports Used

| Port | Service | URL |
|------|---------|-----|
| 4000 | Unified Backend | http://localhost:4000 |
| 5173 | CVR_APA Frontend (dev) | http://localhost:5173 |
| 5174 | CVR_ONLY Frontend (dev) | http://localhost:5174 |
| 27017 | MongoDB | mongodb://localhost:27017 |

---

For detailed instructions, see **QUICKSTART.md**
