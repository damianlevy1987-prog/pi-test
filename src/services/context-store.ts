export interface StoredContext {
  agent_id: string;
  topic: string;
  data: any;
  created_at: number;
  updated_at: number;
}

export class ContextStore {
  private store: Map<string, StoredContext> = new Map();

  async save(context: { agent_id: string; topic: string; data: any }): Promise<void> {
    const key = `${context.agent_id}:${context.topic}`;
    this.store.set(key, {
      ...context,
      created_at: Date.now(),
      updated_at: Date.now()
    });
  }

  async load(agentId: string, topic: string): Promise<StoredContext | null> {
    const key = `${agentId}:${topic}`;
    return this.store.get(key) || null;
  }

  async delete(agentId: string, topic: string): Promise<void> {
    const key = `${agentId}:${topic}`;
    this.store.delete(key);
  }

  async list(agentId?: string): Promise<StoredContext[]> {
    return Array.from(this.store.values()).filter(
      c => !agentId || c.agent_id === agentId
    );
  }
}