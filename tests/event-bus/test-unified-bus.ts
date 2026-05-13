import { describe, it, expect } from 'vitest';
import { createEventBus } from '../../src/event-bus/index';

describe('createEventBus', () => {
  it('should create in-memory event bus for development', () => {
    const eventBus = createEventBus('development');
    expect(eventBus).toBeDefined();
  });

  it('should create Kafka event bus for production', () => {
    const eventBus = createEventBus('production');
    expect(eventBus).toBeDefined();
  });
});