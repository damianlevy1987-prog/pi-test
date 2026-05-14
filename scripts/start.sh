#!/usr/bin/env sh
set -e

./scripts/wait-for-postgres.sh
node scripts/migrate.js
node dist/src/server.js
