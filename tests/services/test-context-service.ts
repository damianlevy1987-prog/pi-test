import { describe, it, expect, beforeEach } from 'vitest';
import { ContextService } from '../../src/services/context-service';
import { EventBus } from '../../src/event-bus';

describe('ContextService', () => {
  let eventBus: EventBus;
  let contextService: ContextService;

  beforeEach(() => {
    eventBus = new EventBus();
    contextService = new ContextService(eventBus);
  });

  it('should build context with research results', async () => {
    const request = {
      agent_id: 'vulnhunter-001',
      topic: 'web application testing',
      inputs: {
        research_results: [{ cve: 'CVE-2024-1234', severity: 'high' }],
        target_data: { url: 'https://example.com' },
        session_data: { user: 'testuser' }
      }
    };
    const context = await contextService.buildContext(request);
    expect(context.agent_id).toBe('vulnhunter-001');
    expect(context.topic).toBe('web application testing');
    expect(context.context_data.target?.url).toBe('https://example.com');
    expect(context.context_data.vulnerability).toHaveLength(1);
    expect(context.ttl).toBe(3600000);
  });

  it('should get context by agent and topic', async () => {
    const request = {
      agent_id: 'exploiter-001',
      topic: 'exploit development',
      inputs: { target_data: { target: '192.168.1.100' } }
    };
    await contextService.buildContext(request);
    const context = await contextService.getContext('exploiter-001', 'exploit development');
    expect(context).not.toBeNull();
    expect(context?.agent_id).toBe('exploiter-001');
  });

  it('should return null for non-existent context', async () => {
    const context = await contextService.getContext('unknown-agent', 'unknown-topic');
    expect(context).toBeNull();
  });

  it('should build context with minimal inputs', async () => {
    const request = {
      agent_id: 'scout-001',
      topic: 'reconnaissance',
      inputs: {}
    };
    const context = await contextService.buildContext(request);
    expect(context.agent_id).toBe('scout-001');
    expect(context.context_data.target).toEqual({});
    expect(context.context_data.session).toEqual({});
  });
});