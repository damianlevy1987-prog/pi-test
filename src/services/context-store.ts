// Context Store - Implementation with memory support

export interface ContextStoreOptions {
  type: 'memory' | 'file' | 'database';
  path?: string;
}

export class ContextStore {
  private options: ContextStoreOptions;
  private memoryStore = new Map<string, any>();
  
  constructor(options: ContextStoreOptions = { type: 'memory' }) {
    this.options = options;
  }
  
  async save(key: string, data: any): Promise<void> {
    if (this.options.type === 'memory') {
      this.memoryStore.set(key, data);
    }
    console.log(`[ContextStore] Saving context: ${key}`);
  }
  
  async load(key: string): Promise<any | null> {
    if (this.options.type === 'memory') {
      return this.memoryStore.get(key) || null;
    }
    console.log(`[ContextStore] Loading context: ${key}`);
    return null;
  }
  
  async delete(key: string): Promise<void> {
    if (this.options.type === 'memory') {
      this.memoryStore.delete(key);
    }
    console.log(`[ContextStore] Deleting context: ${key}`);
  }
  
  async list(): Promise<string[]> {
    if (this.options.type === 'memory') {
      return Array.from(this.memoryStore.keys());
    }
    console.log(`[ContextStore] Listing contexts`);
    return [];
  }
}