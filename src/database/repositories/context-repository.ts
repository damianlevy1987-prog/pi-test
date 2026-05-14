export interface ContextEntity {
  id: string;
  agentId: string;
  topic: string;
  contextType: string;
  contextData: any;
  createdAt: Date;
}

export class ContextRepository {
  private contexts = new Map<string, ContextEntity>();
  
  async save(ctx: ContextEntity): Promise<void> {
    this.contexts.set(ctx.id, ctx);
  }
  
  async findByAgent(agentId: string): Promise<ContextEntity[]> {
    return Array.from(this.contexts.values()).filter(c => c.agentId === agentId);
  }
  
  async findByTopic(topic: string): Promise<ContextEntity[]> {
    return Array.from(this.contexts.values()).filter(c => c.topic === topic);
  }
  
  async delete(id: string): Promise<void> {
    this.contexts.delete(id);
  }
}