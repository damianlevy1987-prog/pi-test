import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ContextService } from '../../src/services/context-service';

describe('ContextService', () => {
  let contextService: ContextService;
  let mockEventBus: any;

  beforeEach(() => {
    mockEventBus = {
      publish: vi.fn().mockResolvedValue(undefined),
      subscribe: vi.fn()
    };
    contextService = new ContextService(mockEventBus);
  });

  it('should build context for agent', async () => {
    const request = {
      agent_id: 'scout',
      topic: 'target.com',
      inputs: {
        research_results: [{ type: 'dns', data: {} }],
        target_data: { domain: 'target.com' }
      }
    };

    const context = await contextService.buildContext(request);
    expect(context).toHaveProperty('agent_id', 'scout');
    expect(context).toHaveProperty('topic', 'target.com');
    expect(context).toHaveProperty('context_data');
  });

  it('should retrieve cached context', async () => {
    const request = {
      agent_id: 'scout',
      topic: 'test',
      inputs: {}
    };

    await contextService.buildContext(request);
    const context = await contextService.getContext('scout', 'test');
    
    expect(context).not.toBeNull();
    expect(context?.agent_id).toBe('scout');
  });

  it('should throw when updating non-existent context', async () => {
    await expect(
      contextService.updateContext('scout', 'nonexistent', { ttl: 500 })
    ).rejects.toThrow('Context not found');
  });

  it('should update existing context', async () => {
    const request = {
      agent_id: 'scout',
      topic: 'test',
      inputs: {}
    };

    await contextService.buildContext(request);
    const updated = await contextService.updateContext('scout', 'test', { ttl: 500 });
    
    expect(updated.ttl).toBe(500);
  });
});