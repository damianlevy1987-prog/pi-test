-- PostgreSQL Schema for AI OS Security

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Audit Events Table
CREATE TABLE IF NOT EXISTS audit_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(50) NOT NULL,
  source_service VARCHAR(50) NOT NULL,
  payload JSONB NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_events_type ON audit_events(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_events_created ON audit_events(created_at);

-- Research Results Table
CREATE TABLE IF NOT EXISTS research_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_research_topic ON research_results(topic);
CREATE INDEX IF NOT EXISTS idx_research_status ON research_results(status);
CREATE INDEX IF NOT EXISTS idx_research_created ON research_results(created_at);

-- Contexts Table
CREATE TABLE IF NOT EXISTS contexts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_contexts_agent ON contexts(agent_id);
CREATE INDEX IF NOT EXISTS idx_contexts_expires ON contexts(expires_at);
CREATE INDEX IF NOT EXISTS idx_contexts_lookup ON contexts(agent_id, topic);

-- Agent Actions Table
CREATE TABLE IF NOT EXISTS agent_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_agent_actions_agent ON agent_actions(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_actions_status ON agent_actions(status);
CREATE INDEX IF NOT EXISTS idx_agent_actions_created ON agent_actions(created_at);

-- Source Configurations Table
CREATE TABLE IF NOT EXISTS source_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_type VARCHAR(50) NOT NULL,
  handler_type VARCHAR(50) NOT NULL,
  configuration JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);