import { EventBus } from '../event-bus';
import { ContextBuildRequest } from './types';

export interface ContextData {
  agent_id: string;
  topic: string;
  context_data: {
    target?: any;
    vulnerability?: any;
    tool?: any;
    session?: any;
  };
  created_at: number;
  ttl: number;
}

export class ContextService {
  private eventBus: EventBus;
  private cache: Map<string, ContextData> = new Map();

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  async buildContext(request: ContextBuildRequest): Promise<ContextData> {
    const key = `${request.agent_id}:${request.topic}`;
    
    const context: ContextData = {
      agent_id: request.agent_id,
      topic: request.topic,
      context_data: {
        target: request.inputs.target_data || {},
        vulnerability: request.inputs.research_results || [],
        tool: {},
        session: request.inputs.session_data || {}
      },
      created_at: Date.now(),
      ttl: 3600000
    };

    this.cache.set(key, context);
    await this.eventBus.publish('context.ready', context);
    return context;
  }

  async getContext(agentId: string, topic: string): Promise<ContextData | null> {
    const key = `${agentId}:${topic}`;
    return this.cache.get(key) || null;
  }

  async updateContext(agentId: string, topic: string, updates: Partial<ContextData>): Promise<ContextData> {
    const key = `${agentId}:${topic}`;
    const existing = this.cache.get(key);
    if (!existing) throw new Error('Context not found');
    const updated = { ...existing, ...updates };
    this.cache.set(key, updated);
    await this.eventBus.publish('context.updated', updated);
    return updated;
  }
}