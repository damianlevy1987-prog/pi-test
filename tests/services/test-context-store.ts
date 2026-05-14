import { describe, it, expect, beforeEach } from 'vitest';
import { ContextStore } from '../../src/services/context-store';

describe('ContextStore', () => {
  let store: ContextStore;

  beforeEach(() => {
    store = new ContextStore({ type: 'memory' });
  });

  it('should save context', async () => {
    await store.save('context1', { data: 'test' });
    const result = await store.load('context1');
    expect(result).toBeDefined();
  });

  it('should load context', async () => {
    await store.save('context2', { data: 'test data' });
    const result = await store.load('context2');
    expect(result?.data).toBe('test data');
  });

  it('should return null for non-existent context', async () => {
    const result = await store.load('nonexistent');
    expect(result).toBeNull();
  });

  it('should delete context', async () => {
    await store.save('context3', { data: 'to delete' });
    await store.delete('context3');
    const result = await store.load('context3');
    expect(result).toBeNull();
  });

  it('should list contexts', async () => {
    await store.save('ctx1', { data: '1' });
    await store.save('ctx2', { data: '2' });
    const list = await store.list();
    expect(list).toHaveLength(2);
  });
});