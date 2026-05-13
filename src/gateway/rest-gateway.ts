// REST Gateway for AI OS Security Operations
// Usage: npx ts-node src/gateway/rest-gateway.ts

import express from 'express';
import { EventBus } from '../event-bus';
import { ResearchService } from '../services/research-service';
import { ContextService } from '../services/context-service';
import { AgentDispatcher } from '../services/agent-dispatcher';
import { IntegrationService } from '../services/integration-service';

const app = express();
app.use(express.json());

// Initialize services
const eventBus = new EventBus();
const researchService = new ResearchService(eventBus);
const contextService = new ContextService(eventBus);
const agentDispatcher = new AgentDispatcher(eventBus);
const integrationService = new IntegrationService(
  eventBus, 
  researchService, 
  contextService, 
  agentDispatcher
);

// Routes

// POST /api/research - Run parallel research
app.post('/api/research', async (req, res) => {
  try {
    const { topic, sources = ['web', 'database'] } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: 'topic is required' });
    }

    const result = await integrationService.orchestrate({
      task: { action: 'research', target: topic },
      options: { sources }
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// POST /api/context - Build context for agent
app.post('/api/context', async (req, res) => {
  try {
    const { agent_id, topic, inputs = {} } = req.body;
    
    if (!agent_id || !topic) {
      return res.status(400).json({ error: 'agent_id and topic are required' });
    }

    const result = await contextService.buildContext({ agent_id, topic, inputs });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// POST /api/dispatch - Dispatch task to specialist agent
app.post('/api/dispatch', async (req, res) => {
  try {
    const { agent, task, options } = req.body;
    
    if (!agent || !task) {
      return res.status(400).json({ error: 'agent and task are required' });
    }

    const result = await integrationService.orchestrate({ agent, task, options });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// GET /api/agents - List available agents
app.get('/api/agents', (req, res) => {
  const agents = agentDispatcher.getAvailableAgents();
  res.json({ agents });
});

// GET /api/health - Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET / - Welcome
app.get('/', (req, res) => {
  res.json({
    name: 'AI OS Security Operations',
    version: '1.0.0',
    endpoints: {
      'POST /api/research': 'Run parallel research',
      'POST /api/context': 'Build context for agent',
      'POST /api/dispatch': 'Dispatch task to agent',
      'GET /api/agents': 'List available agents',
      'GET /api/health': 'Health check'
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`AI OS Gateway running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /api/research  - Run parallel research');
  console.log('  POST /api/context   - Build context');
  console.log('  POST /api/dispatch  - Dispatch to agent');
  console.log('  GET  /api/agents    - List agents');
  console.log('  GET  /api/health    - Health check');
});

export { app };