// Agent Dispatcher - Stub implementation
// TODO: Implement agent dispatching logic

import { EventBus } from '../event-bus';

export interface AgentTask {
  agent_id: string;
  task_type: string;
  payload: any;
  priority?: 'low' | 'normal' | 'high';
}

export interface AgentResult {
  agent_id: string;
  task_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
}

export class AgentDispatcher {
  private eventBus: EventBus;
  private activeTasks = new Map<string, AgentTask>();
  
  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }
  
  async dispatch(task: AgentTask): Promise<string> {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log(`[AgentDispatcher] Dispatching task ${taskId} to agent ${task.agent_id}`);
    // TODO: Implement actual dispatching logic
    this.activeTasks.set(taskId, task);
    return taskId;
  }
  
  async getStatus(taskId: string): Promise<AgentResult | null> {
    const task = this.activeTasks.get(taskId);
    if (!task) return null;
    return {
      agent_id: task.agent_id,
      task_id: taskId,
      status: 'pending'
    };
  }
  
  async cancel(taskId: string): Promise<boolean> {
    console.log(`[AgentDispatcher] Canceling task ${taskId}`);
    return this.activeTasks.delete(taskId);
  }
  
  listActiveTasks(): string[] {
    return Array.from(this.activeTasks.keys());
  }
}