#!/usr/bin/env bash
set -euo pipefail

echo "[verify] lint"
npm run lint

echo "[verify] typecheck"
npm run typecheck

echo "[verify] test"
npm test

echo "[verify] security audit (high+)"
npm run security:audit

echo "[verify] done"
