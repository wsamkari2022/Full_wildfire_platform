#!/usr/bin/env bash
set -euo pipefail

echo "======================================"
echo "Building Unified VRDS Platform"
echo "======================================"

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

CVR_APA_DIR="$PROJECT_ROOT/ProdFiles/CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main"
CVR_ONLY_DIR="$PROJECT_ROOT/ProdFiles/CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main"
APA_ONLY_DIR="$PROJECT_ROOT/ProdFiles/APA_ONLY_Production_Attempts-main/APA_ONLY_Production_Attempts-main"
BASELINE_DIR="$PROJECT_ROOT/ProdFiles/Baseline_Production_Attempts-main/Baseline_Production_Attempts-main"
UNIFIED_BACKEND_DIR="$PROJECT_ROOT/unified-backend"

echo ""
echo "Step 1: Installing unified backend dependencies..."
cd "$UNIFIED_BACKEND_DIR"
npm install

echo ""
echo "Step 2: Building CVR_APA frontend..."
cd "$CVR_APA_DIR"
npm install
npm run build

echo ""
echo "Step 3: Building CVR_ONLY frontend..."
cd "$CVR_ONLY_DIR"
npm install
npm run build

echo ""
echo "Step 4: Building APA_ONLY frontend..."
cd "$APA_ONLY_DIR"
npm install
npm run build

echo ""
echo "Step 5: Building BASELINE frontend..."
cd "$BASELINE_DIR"
npm install
npm run build

echo ""
echo "Step 5: Building unified backend..."
cd "$UNIFIED_BACKEND_DIR"
npm run build

echo ""
echo "======================================"
echo "Build Complete!"
echo "======================================"
echo "Frontend builds are in: unified-backend/public/"
echo "  - CVR_APA:  unified-backend/public/cvr_apa/"
echo "  - CVR_ONLY: unified-backend/public/cvr_only/"
echo "  - APA_ONLY: unified-backend/public/apa_only/"
echo "  - BASELINE: unified-backend/public/baseline/"
echo ""
echo "Backend build is in: unified-backend/dist/"
echo ""
echo "To start the server:"
echo "  cd unified-backend && npm start"
echo "Or use: ./start-unified.sh"
echo "======================================"
