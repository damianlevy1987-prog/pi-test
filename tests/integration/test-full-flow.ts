import { describe, it, expect } from 'vitest';
import { ResearchService } from '../../src/services/research-service';
import { ContextService } from '../../src/services/context-service';
import { EventBus } from '../../src/event-bus/index';

describe('Full Integration Flow', () => {
  it('should research and build context', async () => {
    const eventBus = new EventBus();
    const research = new ResearchService(eventBus);
    const context = new ContextService(eventBus);
    
    const result = await research.handleRequest({ topic: 'test', sources: ['web'] });
    expect(result.topic).toBe('test');
    
    const ctx = await context.buildContext({ agent_id: 'test', topic: 'test', inputs: {} });
    expect(ctx.agent_id).toBe('test');
  });
});