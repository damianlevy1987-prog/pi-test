import { describe, it, expect, beforeEach, vi } from 'vitest';
import { IntegrationService } from '../../src/services/integration-service';
import { AgentDispatcher } from '../../src/services/agent-dispatcher';
import { EventBus } from '../../src/event-bus';
import { ResearchService } from '../../src/services/research-service';
import { ContextService } from '../../src/services/context-service';

describe('IntegrationService', () => {
  let integrationService: IntegrationService;
  let mockEventBus: any;
  let mockResearchService: any;
  let mockContextService: any;

  beforeEach(() => {
    mockEventBus = new EventBus();
    mockResearchService = {
      handleRequest: vi.fn().mockResolvedValue({ results: [{ data: 'test' }], metadata: { sources_used: ['web'], duration: 10, items_found: 1 } })
    };
    mockContextService = {
      buildContext: vi.fn().mockResolvedValue({ agent_id: 'scout', context_data: {} })
    };
    const agentDispatcher = new AgentDispatcher(mockEventBus);
    integrationService = new IntegrationService(mockEventBus, mockResearchService, mockContextService, agentDispatcher);
  });

  it('should orchestrate research→context pipeline', async () => {
    const result = await integrationService.orchestrate({
      agent: 'scout',
      task: { action: 'recon', target: 'target.com' }
    });

    expect(result).toHaveProperty('research');
    expect(result).toHaveProperty('context');
    expect(result).toHaveProperty('dispatch');
  });

  it('should handle all interaction modes', async () => {
    const modes = ['agent-triggered', 'user-driven', 'hybrid', 'autonomous'];
    
    for (const mode of modes) {
      const result = await integrationService.handleInteraction(mode as any, {
        task: { action: 'test', target: 'test.com' }
      });
      expect(result).toBeDefined();
    }
  });
});

describe('AgentDispatcher', () => {
  let dispatcher: AgentDispatcher;
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
    dispatcher = new AgentDispatcher(eventBus);
  });

  it('should dispatch to correct specialist agent', async () => {
    const result = await dispatcher.dispatch('scout', { context: {}, task: {} });
    expect(result).toBeDefined();
    expect(result.status).toBe('success');
  });

  it('should support all 10 specialist agents', async () => {
    const agents = ['scout', 'vulnhunter', 'exploiter', 'shadowops', 'webbreaker', 
                    'airwave', 'digitalwatcher', 'cloudbreacher', 'domainhunter', 'humanphisher'];
    
    for (const agent of agents) {
      const result = await dispatcher.dispatch(agent as any, { context: {}, task: {} });
      expect(result.status).toBe('success');
    }
  });

  it('should list all available agents', () => {
    const agents = dispatcher.getAvailableAgents();
    expect(agents).toHaveLength(10);
  });
});