#!/bin/bash

# Define some colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log() {
  echo -e "${CYAN}👉 $1${NC}"
}

success() {
  echo -e "${GREEN}✅ $1${NC}"
}

warn() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
  echo -e "${RED}❌ $1${NC}"
}
create_env_file() {
  local path=$1
  log "Creating .env file in $path"
  cat <<EOF > "$path/.env.development"
PGDATABASE=tasks
EOF
  success ".env file created in $path"
}
# Start Express server
log "Navigating to server/"
cd task_api || { error "Failed to cd into server/"; exit 1; }

log "Installing backend dependencies..."
npm install

log "Creating .env files..."
[ ! -f ".env" ] && create_env_file "." || success ".env file already exists in server"

log "Setting up databases..."
npm run setup_dbs

log "Seeding development database..."
npm run seed-prod

log "Starting Express server..."
npm run start &
SERVER_PID=$!
success "Express server started (PID $SERVER_PID)"

# Start React app
log "Navigating to client/"
cd ../task_manager || { error "Failed to cd into client/"; exit 1; }

log "Installing frontend dependencies..."
npm install

log "Starting React app..."
npm run dev &
REACT_PID=$!
success "React app started (PID $REACT_PID)"

# Wait for both
log "Waiting for processes to exit (Ctrl+C to stop)..."
wait
