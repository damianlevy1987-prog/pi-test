#!/usr/bin/env sh
set -e

HOST="${POSTGRES_HOST:-postgres}"
PORT="${POSTGRES_PORT:-5432}"
TIMEOUT="${POSTGRES_WAIT_TIMEOUT:-60}"

echo "Waiting for PostgreSQL at ${HOST}:${PORT}..."

START_TS=$(date +%s)
while ! nc -z "$HOST" "$PORT" >/dev/null 2>&1; do
  NOW_TS=$(date +%s)
  if [ $((NOW_TS - START_TS)) -ge "$TIMEOUT" ]; then
    echo "Timed out waiting for PostgreSQL"
    exit 1
  fi
  sleep 1
done

echo "PostgreSQL is available"
