#!/usr/bin/env bash
set -euo pipefail

echo "======================================"
echo "Starting Unified VRDS Server"
echo "======================================"

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UNIFIED_BACKEND_DIR="$PROJECT_ROOT/unified-backend"

cd "$UNIFIED_BACKEND_DIR"

if [ ! -d "dist" ]; then
  echo "Error: Backend not built. Run ./build-all.sh first"
  exit 1
fi

if [ ! -d "public/cvr_apa" ] || [ ! -d "public/cvr_only" ]; then
  echo "Warning: Frontend builds not found. Run ./build-all.sh first"
  echo "Continuing anyway (API will work, but frontends won't be served)"
fi

echo ""
echo "Starting server on port 4000..."
echo "Press Ctrl+C to stop"
echo ""

NODE_ENV=production node dist/server.js
