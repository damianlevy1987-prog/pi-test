# Parallel Research & Context System Design

**Project:** AI OS for Security Operations  
**Date:** 2026-05-12  
**Architecture:** Event-Driven Microservices (Option C)

---

## 1. Overview

This design specifies a parallel research and context building system for an AI OS focused on ethical hacking, pentesting, sniffing, crawling, and related security operations. The system uses an event-driven microservices architecture to provide maximum scalability and flexibility.

### 1.1 Goals

- Enable parallel research across multiple security topics simultaneously
- Build context for multiple specialist agents in parallel
- Support all interaction modes: Agent-Triggered, User-Driven, Hybrid, Autonomous
- Flexible data sources: Web, Database, File (any combination)
- Phase-by-phase implementation: Research → Context → Integration

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     AI OS - PARALLEL RESEARCH & CONTEXT SYSTEM         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌──────────────────────────────────────────────────────────────┐    │
│   │                      EVENT BUS (Kafka/RabbitMQ)               │    │
│   │            Central message broker for all services            │    │
│   └──────────────────────────────────────────────────────────────┘    │
│                    ↑              ↑              ↑                      │
│                    │              │              │                      │
│         ┌──────────┴───┐  ┌───────┴────┐  ┌─────┴──────┐             │
│         │   RESEARCH   │  │  CONTEXT   │  │ INTEGRATION│             │
│         │   SERVICE    │  │  SERVICE   │  │  SERVICE   │             │
│         └──────────────┘  └────────────┘  └────────────┘             │
│                ↑                ↑               ↑                      │
│                │                │               │                      │
│         ┌──────┴───┐     ┌──────┴───┐    ┌──────┴────┐              │
│         │Web Pool  │     │Context   │    │Agent      │              │
│         │Database  │     │Cache      │    │Dispatcher │              │
│         │File Pool │     │Builder    │    │           │              │
│         └──────────┘     └───────────┘    └───────────┘              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Core Services

### 3.1 Research Service

**Purpose:** Execute parallel research across multiple sources

**Components:**
- `WebHandler` - Search engines, security blogs, documentation
- `DatabaseHandler` - CVE databases, exploit-db, security advisories
- `FileHandler` - Local tools output, OSINT data, custom files

**Events:**
- `research.request` - Incoming research request
- `research.completed` - Research results ready
- `research.failed` - Research failed (retry logic)

**Scaling:** Horizontal - spawn workers per source type

---

### 3.2 Context Service

**Purpose:** Build and cache context for specialist agents

**Context Types:**
- `TargetContext` - Target information, ports, services
- `VulnerabilityContext` - CVEs, exploits, severity
- `ToolContext` - Tool configurations, outputs
- `SessionContext` - Current session state

**Events:**
- `context.build` - Build context request
- `context.updated` - Context updated
- `context.retrieved` - Context retrieved

---

### 3.3 Integration Service

**Purpose:** Orchestrate research→context pipeline, dispatch to agents

**Functions:**
- Coordinate all 4 interaction modes
- Manage workflow between services
- Dispatch tasks to specialist agents

**Events:**
- `dispatch.to.agent` - Dispatch to specialist agent
- `agent.response` - Agent response received
- `orchestrate` - Orchestration request

---

## 4. Event Schema

### 4.1 Research Events

```json
{
  "event": "research.request",
  "payload": {
    "topic": "string",
    "sources": ["web", "database", "file", "combinations"],
    "options": {
      "depth": "shallow|deep",
      "timeout": "number",
      "filters": []
    }
  }
}
```

```json
{
  "event": "research.completed",
  "payload": {
    "topic": "string",
    "results": [],
    "metadata": {
      "sources_used": [],
      "duration": "number",
      "items_found": "number"
    }
  }
}
```

### 4.2 Context Events

```json
{
  "event": "context.build",
  "payload": {
    "agent_id": "string",
    "topic": "string",
    "inputs": {
      "research_results": [],
      "target_data": {},
      "session_data": {}
    }
  }
}
```

### 4.3 Dispatch Events

```json
{
  "event": "dispatch.to.agent",
  "payload": {
    "agent": "string",
    "context": {},
    "task": {
      "action": "string",
      "target": "string",
      "parameters": {}
    }
  }
}
```

---

## 5. Interaction Modes

| Mode | Trigger | Implementation |
|------|---------|----------------|
| Agent-Triggered | Agent sends event | Agents publish to event bus |
| User-Driven | CLI/API call | Gateway service handles requests |
| Hybrid | Both | Combined handlers for both triggers |
| Autonomous | Rules engine | Scheduled tasks + reactive triggers |

### 5.1 Agent-Triggered Flow
```
Specialist Agent → Event Bus → Research Service → Context Service → Agent
```

### 5.2 User-Driven Flow
```
User CLI → Gateway → Event Bus → (same pipeline)
```

### 5.3 Autonomous Flow
```
Rules Engine → Scheduled Events → Event Bus → (pipeline)
```

---

## 6. Data Sources

### 6.1 Supported Sources

- **Web Only** - Search engines, security sites
- **Database Only** - CVE, exploit-db, local DBs
- **File Only** - Local files, tool outputs
- **Combinations** - Any mix of above

### 6.2 Source Handlers

| Handler | Capabilities |
|---------|--------------|
| WebHandler | HTTP requests, parsing, scraping |
| DatabaseHandler | SQL queries, API calls |
| FileHandler | Local file reading, glob patterns |

---

## 7. Integration with Specialist Agents

The system integrates with the existing 10 specialist agents:

1. **Scout** (Reconnaissance) - Triggers research for targets
2. **VulnHunter** (Vulnerability) - Triggers CVE/exploit research
3. **Exploiter** - Triggers exploit research
4. **ShadowOps** - Triggers post-exploitation research
5. **WebBreaker** - Triggers web vulnerability research
6. **AirWave** - Triggers wireless research
7. **DigitalWatcher** - Triggers forensics research
8. **CloudBreacher** - Triggers cloud security research
9. **DomainHunter** - Triggers AD research
10. **HumanPhisher** - Triggers social engineering research

---

## 8. Implementation Phases

### Phase 1: Parallel Research System
- Event bus setup
- Research service implementation
- Source handlers (Web, Database, File)

### Phase 2: Parallel Context Building
- Context service implementation
- Context cache
- Context builder

### Phase 3: Integration Layer
- Integration service
- Agent dispatcher
- Workflow orchestration

---

## 9. Error Handling

- **Retries:** Exponential backoff for failed events
- **Dead Letters:** Failed messages go to dead letter queue
- **Circuit Breakers:** Prevent cascade failures
- **Logging:** All events logged for debugging

---

## 10. Acceptance Criteria

1. ✅ Can research multiple security topics in parallel
2. ✅ Can build context for multiple agents simultaneously
3. ✅ Supports all 4 interaction modes
4. ✅ Supports any data source combination
5. ✅ Integrates with 10 specialist agents
6. ✅ Event-driven architecture with message bus
7. ✅ Scalable microservices design

---

*Design approved: 2026-05-12*
*Following brainstorming: exploring project context, asking questions, proposing approaches, presenting design, user approval*