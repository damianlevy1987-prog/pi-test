# System Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the Parallel Research & Context System with Kafka event streaming, PostgreSQL persistence, configurable source handlers, and expanded specialist agents.

**Architecture:** Complete Migration with Configuration Flexibility - Kafka for production, in-memory fallback for development.

**Tech Stack:** Apache Kafka, PostgreSQL, Redis, TypeScript, Node.js

---

## Phase 1: Kafka Integration

### Task 1: Configuration Layer & Mode Switcher

**Files:**
- Create: `src/config/system-config.ts`
- Create: `src/config/mode-switcher.ts`
- Test: `tests/config/test-mode-switcher.ts`

### Task 2: Kafka Client Implementation

**Files:**
- Create: `src/event-bus/kafka-event-bus.ts`
- Test: `tests/event-bus/test-kafka-event-bus.ts`

### Task 3: Unified Event Bus Interface

**Files:**
- Modify: `src/event-bus/index.ts`
- Test: `tests/event-bus/test-unified-bus.ts`

---

## Phase 2: PostgreSQL Persistence

### Task 4: Database Schema & Repository

**Files:**
- Create: `src/database/schema.sql`
- Create: `src/database/connection.ts`
- Create: `src/database/repositories/audit-repository.ts`

---

## Phase 3: Enhanced Source Handlers

### Task 5: Configurable Web Handler

**Files:**
- Create: `src/handlers/config/web-handler-config.ts`
- Create: `src/handlers/configurable-web-handler.ts`
- Test: `tests/handlers/test-configurable-web-handler.ts`

---

## Phase 4: Specialist Agent Expansion

### Task 6: Agent Expansion with 10 Sub-Agents Each

**Files:**
- Create: `src/agents/expanded/scout-expanded.ts`
- Create: `src/agents/expanded/vulnhunter-expanded.ts`
- Test: `tests/agents/test-expanded-agents.ts`

### Task 7: New Specialist Domains (IoT, Mobile, ICS)

**Files:**
- Create: `src/agents/specialists/iot-scanner.ts`
- Create: `src/agents/specialists/mobile-guardian.ts`
- Create: `src/agents/specialists/industrial-guard.ts`
- Test: `tests/agents/test-new-specialists.ts`

---

## Phase 5: Integration & Testing

### Task 8: End-to-End Integration Tests

**Files:**
- Test: `tests/integration/test-enhanced-system.ts`

---

## Summary

| Phase | Task | Description |
|-------|------|-------------|
| 1 | 1 | Configuration Layer & Mode Switcher |
| 1 | 2 | Kafka Client Implementation |
| 1 | 3 | Unified Event Bus Interface |
| 2 | 4 | PostgreSQL Schema & Repository |
| 3 | 5 | Configurable Web Handler |
| 4 | 6 | Agent Expansion (10 sub-agents) |
| 4 | 7 | New Specialist Domains |
| 5 | 8 | E2E Integration Tests |

*Plan: 2026-05-13*