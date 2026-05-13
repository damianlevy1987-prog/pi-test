import { describe, it, expect, beforeEach } from 'vitest';
import { ContextCache } from '../../src/services/context-cache';
import { ContextStore } from '../../src/services/context-store';

describe('ContextCache', () => {
  it('should store and retrieve context', async () => {
    const cache = new ContextCache();
    await cache.set('test:topic', { agent_id: 'test', data: {} });
    const result = await cache.get('test:topic');
    expect(result).toEqual({ agent_id: 'test', data: {} });
  });

  it('should respect TTL', async () => {
    const cache = new ContextCache({ ttl: 100 });
    await cache.set('test:topic', { data: 'test' });
    await new Promise(r => setTimeout(r, 150));
    const result = await cache.get('test:topic');
    expect(result).toBeNull();
  });

  it('should support eviction', async () => {
    const cache = new ContextCache({ maxSize: 2 });
    await cache.set('a:1', { data: 'a' });
    await cache.set('b:2', { data: 'b' });
    await cache.set('c:3', { data: 'c' });
    const result = await cache.get('a:1');
    expect(result).toBeNull();
  });
});

describe('ContextStore', () => {
  it('should persist context', async () => {
    const store = new ContextStore();
    await store.save({ agent_id: 'test', topic: 'topic', data: {} });
    const result = await store.load('test', 'topic');
    expect(result).toBeDefined();
    expect(result?.agent_id).toBe('test');
  });

  it('should delete context', async () => {
    const store = new ContextStore();
    await store.save({ agent_id: 'test', topic: 'topic', data: {} });
    await store.delete('test', 'topic');
    const result = await store.load('test', 'topic');
    expect(result).toBeNull();
  });

  it('should list contexts by agent', async () => {
    const store = new ContextStore();
    await store.save({ agent_id: 'scout', topic: 't1', data: {} });
    await store.save({ agent_id: 'scout', topic: 't2', data: {} });
    await store.save({ agent_id: 'vulnhunter', topic: 't3', data: {} });
    const scoutContexts = await store.list('scout');
    expect(scoutContexts).toHaveLength(2);
  });
});