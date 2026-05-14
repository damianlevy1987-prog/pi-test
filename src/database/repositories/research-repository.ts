export interface ResearchEntity {
  id: string;
  topic: string;
  sourcesUsed: string[];
  results: any;
  metadata: any;
  createdAt: Date;
}

export class ResearchRepository {
  private research = new Map<string, ResearchEntity>();
  
  async save(r: ResearchEntity): Promise<void> {
    this.research.set(r.id, r);
  }
  
  async findByTopic(topic: string): Promise<ResearchEntity[]> {
    return Array.from(this.research.values()).filter(r => r.topic === topic);
  }
  
  async findRecent(limit: number): Promise<ResearchEntity[]> {
    return Array.from(this.research.values()).slice(-limit);
  }
}