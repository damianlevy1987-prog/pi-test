import { describe, it, expect, beforeEach } from 'vitest';
import { ContextCache } from '../../src/services/context-cache';

describe('ContextCache', () => {
  let cache: ContextCache;

  beforeEach(() => {
    cache = new ContextCache({ ttl: 1000, maxSize: 3 });
  });

  it('should set and get value', async () => {
    await cache.set('key1', { data: 'test' });
    const result = await cache.get('key1');
    expect(result).toEqual({ data: 'test' });
  });

  it('should return null for non-existent key', async () => {
    const result = await cache.get('nonexistent');
    expect(result).toBeNull();
  });

  it('should expire entries after ttl', async () => {
    const fastCache = new ContextCache({ ttl: 50, maxSize: 10 });
    await fastCache.set('key1', { data: 'test' });
    await new Promise(resolve => setTimeout(resolve, 60));
    const result = await fastCache.get('key1');
    expect(result).toBeNull();
  });

  it('should evict oldest entry when max size reached', async () => {
    await cache.set('key1', { data: 'first' });
    await cache.set('key2', { data: 'second' });
    await cache.set('key3', { data: 'third' });
    await cache.set('key4', { data: 'fourth' });
    const result = await cache.get('key1');
    expect(result).toBeNull();
  });

  it('should respect custom ttl', async () => {
    const longTtlCache = new ContextCache({ ttl: 5000, maxSize: 10 });
    await longTtlCache.set('key1', { data: 'long ttl' });
    const result = await longTtlCache.get('key1');
    expect(result).toEqual({ data: 'long ttl' });
  });
});