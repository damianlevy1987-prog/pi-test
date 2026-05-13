export interface CacheOptions { ttl?: number; maxSize?: number; }

export class ContextCache {
  private cache = new Map<string, { data: any; expiry: number }>();
  private ttl: number;
  private maxSize: number;
  
  constructor(options: CacheOptions = {}) {
    this.ttl = options.ttl || 3600000;
    this.maxSize = options.maxSize || 1000;
  }
  
  async set(key: string, data: any): Promise<void> {
    if (this.cache.size >= this.maxSize) { const first = this.cache.keys().next().value; this.cache.delete(first); }
    this.cache.set(key, { data, expiry: Date.now() + this.ttl });
  }
  
  async get(key: string): Promise<any | null> {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) { this.cache.delete(key); return null; }
    return entry.data;
  }
}