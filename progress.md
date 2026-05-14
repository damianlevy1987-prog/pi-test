# Progress

## Status
Phase 6 complete

## Tasks
- Added Dockerfile for Node 22 production runtime with build + runtime stages
- Added docker-compose stack for app + postgres with health checks
- Added migration bootstrap script using `src/database/schema.sql`
- Added postgres wait script and container startup script
- Added npm scripts: `build`, `start`, `migrate`, `dev:start`
- Updated `.env.example` for container/runtime parity

## Files Changed
- Dockerfile
- docker-compose.yml
- scripts/wait-for-postgres.sh
- scripts/start.sh
- scripts/migrate.js
- src/server.ts
- package.json
- .env.example

## Notes
- Startup flow: wait for postgres -> run migration -> start API server.
- Migration script safely no-ops when `DATABASE_URL` is unset.
