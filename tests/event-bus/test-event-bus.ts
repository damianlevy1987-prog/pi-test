import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EventBus } from '../../src/event-bus/index';

describe('EventBus', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  it('should publish and subscribe to events', async () => {
    const payload = { topic: 'test', data: { message: 'hello' } };
    const handler = vi.fn();
    
    eventBus.subscribe('test', handler);
    await eventBus.publish('test', payload);
    
    expect(handler).toHaveBeenCalledWith(payload);
  });

  it('should support multiple subscribers', async () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    
    eventBus.subscribe('test', handler1);
    eventBus.subscribe('test', handler2);
    await eventBus.publish('test', { data: 'test' });
    
    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });
});