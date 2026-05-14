import { describe, it, expect } from 'vitest';
import { KafkaEventBus } from '../../src/event-bus/kafka-bus';

describe('KafkaEventBus', () => {
  it('should connect', async () => {
    const bus = new KafkaEventBus({ brokers: ['localhost:9092'], clientId: 'test', groupId: 'test' });
    await bus.connect();
    expect(bus.isConnected()).toBe(true);
  });
  
  it('should publish and subscribe', async () => {
    const bus = new KafkaEventBus({ brokers: ['localhost:9092'], clientId: 'test', groupId: 'test' });
    let received: any = null;
    await bus.subscribe('test.event', async (data) => { received = data; });
    await bus.publish('test.event', { message: 'hello' });
    expect(received.message).toBe('hello');
  });
});