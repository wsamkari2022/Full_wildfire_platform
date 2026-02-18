#!/usr/bin/env bash
set -euo pipefail

echo "======================================"
echo "Starting Unified VRDS Development Environment"
echo "======================================"

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CVR_APA_DIR="$PROJECT_ROOT/ProdFiles/CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main"
CVR_ONLY_DIR="$PROJECT_ROOT/ProdFiles/CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main"
UNIFIED_BACKEND_DIR="$PROJECT_ROOT/unified-backend"

echo ""
echo "Installing dependencies if needed..."

if [ ! -d "$UNIFIED_BACKEND_DIR/node_modules" ]; then
  echo "Installing unified backend dependencies..."
  cd "$UNIFIED_BACKEND_DIR" && npm install
fi

if [ ! -d "$CVR_APA_DIR/node_modules" ]; then
  echo "Installing CVR_APA dependencies..."
  cd "$CVR_APA_DIR" && npm install
fi

if [ ! -d "$CVR_ONLY_DIR/node_modules" ]; then
  echo "Installing CVR_ONLY dependencies..."
  cd "$CVR_ONLY_DIR" && npm install
fi

echo ""
echo "======================================"
echo "Starting all services..."
echo "======================================"
echo "Unified Backend:  http://localhost:4000"
echo "CVR_APA Frontend: http://localhost:5173"
echo "CVR_ONLY Frontend: http://localhost:5174"
echo ""
echo "Landing Page:     http://localhost:4000/"
echo "CVR_APA App:      http://localhost:4000/VRDS_CVR_APA"
echo "CVR_ONLY App:     http://localhost:4000/VRDS_CVR"
echo ""
echo "Press Ctrl+C to stop all services"
echo "======================================"
echo ""

trap 'kill 0' EXIT

cd "$UNIFIED_BACKEND_DIR" && npm run dev &
cd "$CVR_APA_DIR" && npm run dev &
cd "$CVR_ONLY_DIR" && npm run dev &

wait
