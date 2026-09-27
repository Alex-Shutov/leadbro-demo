# Deploy demo frontend to a VPS / dedicated server via Docker.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  echo "No .env found — copying from .env.example"
  cp .env.example .env
fi

echo "Building and starting frontend..."
docker compose -f docker-compose.yml --env-file .env up --build -d

echo
echo "Done. App should be available on port from EXTERNAL_PORT in .env (default 8080)."
echo "  curl -I http://127.0.0.1:\${EXTERNAL_PORT:-8080}/"
