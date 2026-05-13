# Parallel Research & Context System - Production Enhancement

**Project:** AI OS for Security Operations  
**Date:** 2026-05-13  
**Phase:** Production Enhancement  
**Architecture:** Complete Migration with Configuration Flexibility

---

## 1. Overview

This design specifies enhancements to the Parallel Research & Context System for production deployment. The system adds Kafka-based event streaming, PostgreSQL persistence for full audit trails, enhanced configurable source handlers, and expanded specialist agent capabilities.

### 1.1 Goals

- Replace in-memory EventBus with Kafka for production scalability
- Add PostgreSQL persistence for complete audit trail
- Enhance source handlers with configurable API, scraping, and hybrid modes
- Expand specialist agents with new domains and AI autonomy
- Maintain development mode with in-memory fallback

### 1.2 Architecture Decision

**Approach 2 with Hybrid Flexibility** - Complete migration to production infrastructure with configuration layer for mode switching.

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│              CONFIGURATION LAYER (switch modes)                        │
│         MODE: production | development | hybrid                        │
└────────────────────────┬────────────────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        ↓                                 ↓
┌─────────────────────────┐   ┌─────────────────────────┐
│    KAFKA EVENT BUS      │   │    In-Memory Fallback  │
│    (Production Mode)   │   │    (Dev/Debug Mode)    │
│                        │   │                        │
│  - research.requests   │   │  Same API interface    │
│  - research.results   │   │  Switchable via config  │
│  - context.build       │   │                        │
│  - dispatch.agents     │   │                        │
└────────────┬────────────┘   └─────────────────────────┘
             │
    ┌────────┴────────┬────────┬────────┐
    ↓                 ↓        ↓        ↓
┌─────────┐    ┌─────────┐┌─────────┐┌─────────┐
│Research │    │Context  ││Integ.   ││  Agent  │
│Service  │    │Service  ││Service  ││Dispatcher│
└─────────┘    └────┬────┘└─────────┘└─────────┘
                    ↓
          ┌────────┴────────┐
          ↓                 ↓
    ┌───────────┐   ┌───────────┐
    │PostgreSQL │   │  Redis    │
    │(Audit)    │   │  (Cache)  │
    └───────────┘   └───────────┘
```

---

## 3. Kafka Event Bus

### 3.1 Topics Configuration

| Topic | Partitions | Retention | Purpose |
|-------|------------|-----------|---------|
| `research.requests` | 6 | 7 days | Incoming research requests |
| `research.results` | 6 | 7 days | Research completion results |
| `context.build` | 4 | 3 days | Context building requests |
| `context.ready` | 4 | 3 days | Context ready notifications |
| `dispatch.agents` | 10 | 1 day | Agent dispatch commands |
| `agent.responses` | 10 | 7 days | Agent response streams |

### 3.2 Consumer Groups

| Group | Topics | Purpose |
|-------|--------|---------|
| `research-workers` | research.requests, research.results | Parallel research processing |
| `context-workers` | context.build, context.ready | Context building |
| `integration-workers` | dispatch.agents, agent.responses | Orchestration |

### 3.3 Producer/Consumer Configuration

```typescript
interface KafkaConfig {
  brokers: string[];
  clientId: string;
  consumer: {
    groupId: string;
    sessionTimeout: number;
    heartbeatInterval: number;
  };
  producer: {
    acks: 'all' | 'leader' | 'none';
    retries: number;
    retryBackoff: number;
  };
  topics: {
    researchRequests: string;
    researchResults: string;
    contextBuild: string;
    contextReady: string;
    dispatchAgents: string;
    agentResponses: string;
  };
}
```

---

## 4. PostgreSQL Schema

### 4.1 Database: `ai_os_security`

### 4.2 Tables

#### audit_events
```sql
CREATE TABLE audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(50) NOT NULL,
  source_service VARCHAR(50) NOT NULL,
  payload JSONB NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  partition_key VARCHAR(100)
);

CREATE INDEX idx_audit_events_type ON audit_events(event_type);
CREATE INDEX idx_audit_events_created ON audit_events(created_at);
CREATE INDEX idx_audit_events_partition ON audit_events(partition_key);
```

#### research_results
```sql
CREATE TABLE research_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic VARCHAR(255) NOT NULL,
  sources_used TEXT[],
  results JSONB NOT NULL,
  metadata JSONB NOT NULL,
  duration_ms INTEGER,
  items_count INTEGER,
  status VARCHAR(20) DEFAULT 'completed',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_research_topic ON research_results(topic);
CREATE INDEX idx_research_status ON research_results(status);
CREATE INDEX idx_research_created ON research_results(created_at);
```

#### contexts
```sql
CREATE TABLE contexts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id VARCHAR(50) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  context_type VARCHAR(50) NOT NULL,
  context_data JSONB NOT NULL,
  ttl_seconds INTEGER DEFAULT 3600,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(agent_id, topic, context_type)
);

CREATE INDEX idx_contexts_agent ON contexts(agent_id);
CREATE INDEX idx_contexts_expires ON contexts(expires_at);
CREATE INDEX idx_contexts_lookup ON contexts(agent_id, topic);
```

#### agent_actions
```sql
CREATE TABLE agent_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id VARCHAR(50) NOT NULL,
  action VARCHAR(100) NOT NULL,
  target VARCHAR(255),
  parameters JSONB,
  result JSONB,
  status VARCHAR(20) DEFAULT 'pending',
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_agent_actions_agent ON agent_actions(agent_id);
CREATE INDEX idx_agent_actions_status ON agent_actions(status);
CREATE INDEX idx_agent_actions_created ON agent_actions(created_at);
```

#### source_configurations
```sql
CREATE TABLE source_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type VARCHAR(50) NOT NULL,
  handler_type VARCHAR(50) NOT NULL,
  configuration JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 5. Enhanced Source Handlers

### 5.1 Web Handler (Configurable)

**Modes:**
1. **API Mode** - Structured queries via API
2. **Scraping Mode** - Direct page scraping
3. **Hybrid Mode** - Both with automatic fallback

**Supported Sources:**

| Source | Type | API Key Required |
|--------|------|-----------------|
| Google Custom Search | API | Yes |
| Bing Search | API | Yes |
| Shodan | API | Yes |
| Censys | API | Yes |
| CVE Databases | Scraping | No |
| Exploit-DB | Scraping | No |
| Security Blogs | Scraping | No |

**Configuration Schema:**
```typescript
interface WebHandlerConfig {
  mode: 'api' | 'scraping' | 'hybrid';
  sources: {
    name: string;
    type: 'api' | 'scraping';
    apiKey?: string;
    apiUrl?: string;
    scrapeUrl?: string;
    rateLimit?: number;
    priority: number;
  }[];
  fallback: {
    enabled: boolean;
    fallbackOrder: string[];
  };
}
```

### 5.2 Database Handler

**Supported Databases:**
- NVD (National Vulnerability Database)
- CVE.org
- Exploit-DB
- Vulners
- OSV (Open Source Vulnerabilities)

**Configuration:**
```typescript
interface DatabaseHandlerConfig {
  databases: {
    name: string;
    type: 'nvd' | 'cve' | 'exploitdb' | 'vulners' | 'osv';
    apiKey?: string;
    baseUrl: string;
    rateLimit: number;
  }[];
  cacheResults: boolean;
  cacheTtlSeconds: number;
}
```

### 5.3 File Handler

**Capabilities:**
- Local file system scanning
- Network file system support (NFS, SMB)
- Recursive glob patterns
- Content extraction (logs, configs, reports)
- Size limits and filtering

**Configuration:**
```typescript
interface FileHandlerConfig {
  allowedPaths: string[];
  maxFileSize: number;
  includePatterns: string[];
  excludePatterns: string[];
  recursive: boolean;
  extractContent: boolean;
}
```

---

## 6. Specialist Agent Expansion

### 6.1 Current 10 Specialists

| Agent | Domain | Sub-Agents (5 each) |
|-------|--------|---------------------|
| Scout | Reconnaissance | subdomain_enum, port_scanner, osint_collector, dns_recon, whois_lookup |
| VulnHunter | Vulnerability | web_vuln_scan, network_vuln, config_audit, exploit_finder, priority_ranker |
| Exploiter | Exploitation | payload_gen, exploit_dev, privesc, lateral_movement, pivot_setup |
| ShadowOps | Post-Exploitation | credential_dump, persistence, data_exfil, keylogger, lateral_pivot |
| WebBreaker | Web Application | sql_injector, xss_tester, csrf_tester, auth_bypass, waf_bypass |
| AirWave | Wireless & RF | wifi_scanner, wifi_attacker, bluetooth_hunter, rf_scanner, rogue_ap |
| DigitalWatcher | Forensics & IR | memory_forensics, disk_forensics, malware_analyzer, log_analyzer, incident_response |
| CloudBreacher | Cloud & Container | aws_hunter, azure_hunter, gcp_hunter, container_escape, k8s_auditor |
| DomainHunter | Active Directory | ad_enum, ad_exploiter, kerberos_attacker, credential_harvester, ad_persistence |
| HumanPhisher | Social Engineering | phishing_campaign, spear_phish, vishing, baiting, pretexting |

### 6.2 Expanded Sub-Agents (10 each)

**Scout Expansion:**
- subdomain_enum, port_scanner, osint_collector, dns_recon, whois_lookup
- ssl_analysis, tech_fingerprint, cloud_enum, github_osint, dns_zone_transfer

**VulnHunter Expansion:**
- web_vuln_scan, network_vuln, config_audit, exploit_finder, priority_ranker
- api_vuln_scan, iot_vuln_scan, mobile_vuln_scan, supply_chain_scan, zero_day_research

### 6.3 New Specialist Domains

| New Agent | Domain | Sub-Agents |
|-----------|--------|------------|
| IoTScanner | IoT Security | device_enum, firmware_analysis, protocol_analysis, default_creds, vulnerability_scan |
| MobileGuardian | Mobile Security | android_analysis, ios_analysis, app_store_osint, mobile_malware, certificate_pinning |
| IndustrialGuard | ICS/SCADA | plc_scanner, scada_enum, modbus_analysis, hmi_vulns, protocol_fuzzing |

### 6.4 AI Autonomy Mode

**Autonomous Capabilities:**
- Self-initiated research based on target context
- Adaptive strategy selection based on findings
- Automatic escalation to human when confidence low
- Self-learning from past operations

**Configuration:**
```typescript
interface AutonomyConfig {
  enabled: boolean;
  maxAutonomousSteps: number;
  escalationThreshold: number;
  selfLearningEnabled: boolean;
  confidenceThreshold: number;
}
```

---

## 7. Configuration Layer

### 7.1 Mode Configuration

```typescript
interface SystemConfig {
  mode: 'production' | 'development' | 'hybrid';
  
  production: {
    kafka: KafkaConfig;
    postgresql: PostgreSQLConfig;
    redis: RedisConfig;
    eventBus: 'kafka';
  };
  
  development: {
    eventBus: 'in-memory';
    persistence: 'none' | 'sqlite';
  };
  
  hybrid: {
    eventBus: 'kafka' | 'in-memory';
    persistence: 'postgresql' | 'in-memory';
    fallback: boolean;
  };
}
```

### 7.2 Environment Variables

```bash
# Mode
AI_OS_MODE=production|development|hybrid

# Kafka
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=ai-os-security
KAFKA_CONSUMER_GROUP=ai-os-workers

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=ai_os_security
POSTGRES_USER=ai_os
POSTGRES_PASSWORD=

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Source Handler API Keys
SHODAN_API_KEY=
CENSYS_API_ID=
CENSYS_API_SECRET=
GOOGLE_API_KEY=
```

---

## 8. Implementation Phases

### Phase 1: Kafka Integration
- Kafka client setup
- Topic configuration
- Producer/consumer implementation
- Configuration layer with mode switching
- In-memory fallback

### Phase 2: PostgreSQL Persistence
- Database schema creation
- Repository implementations
- Audit event logging
- Migration scripts

### Phase 3: Enhanced Source Handlers
- Web handler configurable modes
- API key management
- Scraping with rate limiting
- Fallback logic

### Phase 4: Specialist Agent Expansion
- New sub-agents per specialist
- New specialist domains (IoT, Mobile, ICS)
- AI autonomy framework

### Phase 5: Integration & Testing
- Full system integration
- Performance testing
- Failover testing
- Documentation

---

## 9. Acceptance Criteria

1. ✅ System operates in production mode with Kafka
2. ✅ System falls back to in-memory in development mode
3. ✅ All events persisted to PostgreSQL for audit
4. ✅ Web handler supports API, scraping, and hybrid modes
5. ✅ All 10 existing specialists have 10 sub-agents each
6. ✅ 3 new specialist domains added (IoT, Mobile, ICS)
7. ✅ AI autonomy mode configurable per agent
8. ✅ Configuration layer allows mode switching
9. ✅ Full audit trail maintained in PostgreSQL
10. ✅ All source handlers configurable via database

---

*Design approved: 2026-05-13*
*Following brainstorming: questions answered, approaches proposed, design sections presented and confirmed*