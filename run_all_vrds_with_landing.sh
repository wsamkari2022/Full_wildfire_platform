#!/usr/bin/env bash
set -euo pipefail

# =========================================
# Run VRDS Landing Page + 4 Experiments (Production)
# - Starts landing server (port 3999) + 4 Node servers (ports 4001-4004)
# - Commands differ per project (start vs start:prod)
# - Kills only the ports we use (3999, 4001-4004)
# - Writes logs to ~/vrds_logs/
# =========================================

BASE_DIR="$HOME/wildfire-platform/ProdFiles"
LOG_DIR="$HOME/vrds_logs"

# Landing page directory (based on your screenshot)
LANDING_DIR="$HOME/wildfire-platform/landing_server/landingPage-main/landingPage-main"
LANDING_PORT=3999
LANDING_CMD="nohup node index.js > landing.log 2>&1 &"

mkdir -p "$LOG_DIR"

# ---- Experiments ----
# Format:
# name|port|folder_relative_to_BASE_DIR|command_to_run
EXPS=(
  "CVR_APA|4001|CVR_APA_Production_Phase_Attempts-main/CVR_APA_Production_Phase_Attempts-main|npm run start:prod"
  "CVR_ONLY|4002|CVR_ONLY_Production_Attempts-main/CVR_ONLY_Production_Attempts-main|npm run start"
  "APA_ONLY|4003|APA_ONLY_Production_Attempts-main/APA_ONLY_Production_Attempts-main|npm run start:prod"
  "BASELINE|4004|Baseline_Production_Attempts-main/Baseline_Production_Attempts-main|npm run start:prod"
)

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "ERROR: Missing required command: $1"
    exit 1
  }
}

kill_port() {
  local port="$1"
  local pids
  pids="$(lsof -ti TCP:"$port" -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "${pids}" ]]; then
    echo "Killing process(es) on port $port: $pids"
    kill -9 $pids || true
  else
    echo "Port $port is free"
  fi
}

start_landing() {
  local log_file="$LOG_DIR/LANDING_${LANDING_PORT}.log"

  if [[ ! -d "$LANDING_DIR" ]]; then
    echo "ERROR: Landing folder not found: $LANDING_DIR"
    return 1
  fi

  echo "========================================="
  echo "Starting LANDING on port $LANDING_PORT"
  echo "Dir: $LANDING_DIR"
  echo "Log: $log_file"
  echo "Cmd: node index.js"
  echo "========================================="

  kill_port "$LANDING_PORT"

  # Run landing page in background (detached)
  nohup bash -lc "cd \"$LANDING_DIR\" && node index.js" >>"$log_file" 2>&1 &

  sleep 1
  if lsof -ti TCP:"$LANDING_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "OK: LANDING is listening on port $LANDING_PORT"
    echo "URL (local):  http://localhost:${LANDING_PORT}/landingpage"
    echo "URL (remote): http://moonlander.fit.edu:${LANDING_PORT}/landingpage"
  else
    echo "WARN: LANDING did not start yet. Check log:"
    echo "  tail -n 3999 \"$log_file\""
  fi
}

start_one() {
  local name="$1"
  local port="$2"
  local rel_dir="$3"
  local cmd="$4"

  local abs_dir="$BASE_DIR/$rel_dir"
  local log_file="$LOG_DIR/${name}_${port}.log"

  if [[ ! -d "$abs_dir" ]]; then
    echo "ERROR: Folder not found: $abs_dir"
    return 1
  fi

  echo "========================================="
  echo "Starting $name on port $port"
  echo "Dir: $abs_dir"
  echo "Log: $log_file"
  echo "Cmd: $cmd"
  echo "========================================="

  kill_port "$port"

  # Start in background and detach
  nohup bash -lc "cd \"$abs_dir\" && $cmd" >>"$log_file" 2>&1 &

  sleep 1
  if lsof -ti TCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "OK: $name is listening on port $port"
  else
    echo "WARN: $name did not start yet. Check log:"
    echo "  tail -n 3999 \"$log_file\""
  fi
}

status_all() {
  echo "========== STATUS =========="

  if lsof -ti TCP:"$LANDING_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "OK: LANDING running on port $LANDING_PORT"
  else
    echo "NO: LANDING NOT running on port $LANDING_PORT"
  fi

  for item in "${EXPS[@]}"; do
    IFS="|" read -r name port rel_dir cmd <<< "$item"
    if lsof -ti TCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
      echo "OK: $name running on port $port"
    else
      echo "NO: $name NOT running on port $port"
    fi
  done

  echo "============================"
}

start_all() {
  need_cmd node
  need_cmd npm
  need_cmd lsof
  need_cmd nohup

  echo "Logs folder: $LOG_DIR"

  # Start landing first
  start_landing

  # Then start experiments
  for item in "${EXPS[@]}"; do
    IFS="|" read -r name port rel_dir cmd <<< "$item"
    start_one "$name" "$port" "$rel_dir" "$cmd"
  done

  echo ""
  echo "All start commands issued."
  echo "Check status: $0 status"
}

stop_all() {
  need_cmd lsof

  echo "Stopping all ports (landing + experiments)..."
  kill_port "$LANDING_PORT"

  for item in "${EXPS[@]}"; do
    IFS="|" read -r name port rel_dir cmd <<< "$item"
    kill_port "$port"
  done

  echo "Stop complete."
}

restart_all() {
  stop_all
  echo ""
  start_all
}

usage() {
  echo "Usage: $0 {start|stop|restart|status}"
  exit 1
}

ACTION="${1:-}"
case "$ACTION" in
  start) start_all ;;
  stop) stop_all ;;
  restart) restart_all ;;
  status) status_all ;;
  *) usage ;;
esac
