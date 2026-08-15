#!/usr/bin/env bash
# Ainzigartig release deploy — derived from the migration handout and the
# layout documented in /srv/ainzigartig/ROLLBACK.md (2026-08-15).
#
# Usage: ops/deploy.sh <git-sha-or-ref> [--restart-only]
#
# Layout:
#   /srv/ainzigartig/releases/<sha>   immutable release (code + node_modules + dist)
#   /srv/ainzigartig/current          symlink to the active release
#   /srv/ainzigartig/ops/server.mjs   runtime adapter placed into the release
#   /etc/ainzigartig/production.env   container environment (secrets)
#
# The container "ainzigartig-app" bind-mounts /srv/ainzigartig/current as
# /app (read-only) and shares the unix socket dir /srv/autowunsch/caddy-config
# with runtime-caddy-1. Env vars are baked at `docker create` — after changing
# production.env you must recreate the container (--restart-only does that).
set -euo pipefail

REF="${1:?usage: deploy.sh <git-sha-or-ref> [--restart-only]}"
RESTART_ONLY="${2:-}"
APP_ROOT="/srv/ainzigartig"
RELEASE="${APP_ROOT}/releases/${REF}"
CURRENT="${APP_ROOT}/current"
ENV_FILE="/etc/ainzigartig/production.env"
SOCKET_DIR="/srv/autowunsch/caddy-config"
SOCKET_PATH="/run/ainzigartig/ainzigartig.sock"

# Node 24-compatible healthcheck — verified against the running production
# container (docker inspect ainzigartig-app). Plain quotes only; the previous
# \xNN-escaped variant broke CMD-SHELL parsing.
read -r HEALTHCHECK_CMD <<'EOF'
node -e "http=require('http');r=http.request({socketPath:'/run/ainzigartig/ainzigartig.sock',path:'/health',timeout:3000},s=>process.exit(s.statusCode===200?0:1));r.on('error',()=>process.exit(1));r.on('timeout',()=>process.exit(1));r.end()"
EOF

if [ "$RESTART_ONLY" = "--restart-only" ]; then
  echo "Recreating container against current release (env re-read)"
  docker rm -f ainzigartig-app >/dev/null
  docker run -d --name ainzigartig-app \
    --network host \
    --restart unless-stopped \
    -v "${CURRENT}:/app:ro" \
    -v "${SOCKET_DIR}:/run/ainzigartig:rw" \
    --env-file "${ENV_FILE}" \
    -e APP_ROOT=/app \
    -e SOCKET_PATH="${SOCKET_PATH}" \
    -e APP_VERSION="$(basename "$(readlink -f "${CURRENT}")")" \
    --health-cmd "${HEALTHCHECK_CMD}" \
    --health-interval 30s \
    --health-timeout 5s \
    --health-retries 3 \
    node:24-bookworm \
    sh -c 'cd /app && exec node /app/server.mjs'
  echo "Container recreated. Verify: curl --unix-socket ${SOCKET_DIR}/ainzigartig.sock http://localhost/health"
  exit 0
fi

# 1. Build the release from a clean checkout of the requested ref.
WORK="$(mktemp -d /tmp/ainzigartig-release.XXXXXX)"
trap 'rm -rf "${WORK}"' EXIT
echo "Cloning ${REF} into ${WORK}"
git clone --depth 1 --branch "${REF}" https://github.com/igoingtodevx/Ainzigartig-Draft.git "${WORK}/src" 2>/dev/null \
  || git -C "$(dirname "$0")/.." archive "${REF}" | tar -x -C "${WORK}" && mv "${WORK}/src" "${WORK}/app"
mkdir -p "${WORK}/app"
if [ ! -f "${WORK}/app/package.json" ]; then
  # fallback: clone without depth limits
  git clone https://github.com/igoingtodevx/Ainzigartig-Draft.git "${WORK}/clone"
  git -C "${WORK}/clone" checkout "${REF}"
  mv "${WORK}/clone" "${WORK}/app"
fi

cd "${WORK}/app"
npm ci
npm run build

# 2. Runtime adapter: the repo's tracked server.mjs is canonical; ops/server.mjs
# is only the fallback for refs that predate it (rollback targets). Drift between
# the two is a release error — sync them in the same commit instead of deploying
# silently inconsistent adapters.
if [ -f server.mjs ]; then
  if ! cmp -s server.mjs "$(dirname "$0")/server.mjs"; then
    echo "ERROR: server.mjs differs from ops/server.mjs — sync them before deploying" >&2
    exit 1
  fi
else
  cp "$(dirname "$0")/server.mjs" server.mjs
fi

# 3. Move into the release dir and flip the symlink.
sudo mkdir -p "${APP_ROOT}/releases"
if [ -e "${RELEASE}" ]; then
  echo "Release ${RELEASE} already exists — aborting (remove it first to force rebuild)"
  exit 1
fi
sudo cp -r "${WORK}/app" "${RELEASE}"
sudo ln -sfn "${RELEASE}" "${CURRENT}"

# 4. Recreate the container against the new release.
docker rm -f ainzigartig-app >/dev/null
docker run -d --name ainzigartig-app \
  --network host \
  --restart unless-stopped \
  -v "${CURRENT}:/app:ro" \
  -v "${SOCKET_DIR}:/run/ainzigartig:rw" \
  --env-file "${ENV_FILE}" \
  -e APP_ROOT=/app \
  -e SOCKET_PATH="${SOCKET_PATH}" \
  -e APP_VERSION="${REF}" \
  --health-cmd "${HEALTHCHECK_CMD}" \
  --health-interval 30s \
  --health-timeout 5s \
  --health-retries 3 \
  node:24-bookworm \
  sh -c 'cd /app && exec node /app/server.mjs'

echo "Deployed ${REF}. Verify:"
echo "  curl --unix-socket ${SOCKET_DIR}/ainzigartig.sock http://localhost/health"
echo "  curl -s https://ainzigartig.sejerlaenner.tech/api/insights | head -c 200"
echo "Rollback: point ${CURRENT} at the previous release and rerun with --restart-only."
