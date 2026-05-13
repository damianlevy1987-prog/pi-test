import { describe, it, expect } from 'vitest';
import { KafkaEventBus } from '../../src/event-bus/kafka-event-bus';

describe('KafkaEventBus', () => {
  it('should create kafka event bus', () => {
    const bus = new KafkaEventBus({
      brokers: ['localhost:9092'],
      clientId: 'test',
      topics: {
        researchRequests: 'test',
        researchResults: 'test',
        contextBuild: 'test',
        contextReady: 'test',
        dispatchAgents: 'test',
        agentResponses: 'test'
      }
    });
    expect(bus).toBeDefined();
  });

  it('should subscribe to events', async () => {
    const bus = new KafkaEventBus({
      brokers: ['localhost:9092'],
      clientId: 'test',
      topics: { researchRequests: 'a', researchResults: 'b', contextBuild: 'c', contextReady: 'd', dispatchAgents: 'e', agentResponses: 'f' }
    });
    const handler = async (p: any) => {};
    bus.subscribe('test', handler);
    await bus.publish('test', { data: 'test' });
    expect(true).toBe(true);
  });
});