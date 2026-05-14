# Threat Model & Security Checklist

## System Context

Primary attack surface:
- REST gateway (`src/gateway/rest-gateway.ts`)
- Auth/token lifecycle endpoints
- DB persistence (audit + token/session state)

Trust boundaries:
- External clients -> API gateway
- Gateway -> token/session store
- Gateway -> persistence layer

## Key Threats (STRIDE-style)

- **Spoofing**: forged API key/JWT, token replay
- **Tampering**: payload manipulation, malformed JWT inputs
- **Repudiation**: missing audit/event trails
- **Information Disclosure**: overbroad errors, docs leakage, insecure CORS
- **Denial of Service**: request flooding, oversized payload abuse
- **Elevation of Privilege**: RBAC bypass attempts

## Current Mitigations

- API key and JWT auth
- Route-level RBAC policy map
- Request validation via Zod
- Identity-based rate limiting
- Payload size limits (`express.json`)
- Structured audit logging (+ DB persistence when configured)
- Security headers (Helmet)
- CORS allowlist
- Token refresh/revoke support with JTI revocation checks

## Security Checklist

- [x] Auth required on `/api/*`
- [x] JWT verification + role checks
- [x] Invalid/malformed token rejection tests
- [x] Request schema validation on mutating endpoints
- [x] Rate limiting enabled
- [x] Audit logging for auth/validation events
- [x] Health/readiness/metrics endpoints exposed
- [x] `npm audit --audit-level=high` in verification flow
- [x] Lint + typecheck + tests in CI
- [ ] Add secret scanning in CI
- [ ] Add SAST/CodeQL workflow
- [ ] Add DB migration runner with rollback strategy
