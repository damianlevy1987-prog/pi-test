import { describe, it, expect, beforeEach } from 'vitest';
import { EventBus } from '../../src/event-bus';
import { ResearchService } from '../../src/services/research-service';
import { ContextService } from '../../src/services/context-service';
import { AgentDispatcher } from '../../src/services/agent-dispatcher';
import { IntegrationService } from '../../src/services/integration-service';

describe('End-to-End Integration', () => {
  let eventBus: EventBus;
  let researchService: ResearchService;
  let contextService: ContextService;
  let agentDispatcher: AgentDispatcher;
  let integrationService: IntegrationService;

  beforeEach(() => {
    eventBus = new EventBus();
    researchService = new ResearchService(eventBus);
    contextService = new ContextService(eventBus);
    agentDispatcher = new AgentDispatcher(eventBus);
    integrationService = new IntegrationService(
      eventBus, 
      researchService, 
      contextService, 
      agentDispatcher
    );
  });

  it('should complete full pipeline: research → context → dispatch', async () => {
    const result = await integrationService.orchestrate({
      agent: 'scout',
      task: { action: 'recon', target: 'target.com' },
      options: { sources: ['web', 'database'] }
    });

    expect(result).toHaveProperty('research');
    expect(result).toHaveProperty('context');
    expect(result).toHaveProperty('dispatch');
    expect(result.research.topic).toBe('target.com');
    expect(result.context.agent_id).toBe('scout');
    expect(result.dispatch.status).toBe('success');
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

  it('should support all data source combinations', async () => {
    const sourceCombos = [
      ['web'],
      ['database'],
      ['file'],
      ['web', 'database'],
      ['web', 'file'],
      ['database', 'file'],
      ['web', 'database', 'file']
    ];

    for (const sources of sourceCombos) {
      const result = await integrationService.orchestrate({
        task: { action: 'research', target: 'test' },
        options: { sources }
      });
      expect(result).toBeDefined();
      expect(result.research.metadata.sources_used).toEqual(sources);
    }
  });

  it('should work with all specialist agents', async () => {
    const agents = ['scout', 'vulnhunter', 'exploiter', 'shadowops', 'webbreaker', 
                    'airwave', 'digitalwatcher', 'cloudbreacher', 'domainhunter', 'humanphisher'];
    
    for (const agent of agents) {
      const result = await integrationService.orchestrate({
        agent: agent as any,
        task: { action: 'test', target: 'target.com' }
      });
      expect(result.context.agent_id).toBe(agent);
    }
  });
});