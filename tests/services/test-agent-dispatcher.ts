import { describe, it, expect, beforeEach } from 'vitest';
import { AgentDispatcher } from '../../src/services/agent-dispatcher';
import { EventBus } from '../../src/event-bus';

describe('AgentDispatcher', () => {
  let eventBus: EventBus;
  let dispatcher: AgentDispatcher;

  beforeEach(() => {
    eventBus = new EventBus();
    dispatcher = new AgentDispatcher(eventBus);
  });

  it('should dispatch task and return task id', async () => {
    const task = {
      agent_id: 'scout-001',
      task_type: 'reconnaissance',
      payload: { target: 'example.com' },
      priority: 'high' as const
    };
    const taskId = await dispatcher.dispatch(task);
    expect(taskId).toMatch(/^task_/);
  });

  it('should get task status', async () => {
    const task = {
      agent_id: 'vulnhunter-001',
      task_type: 'scan',
      payload: { url: 'https://test.com' }
    };
    const taskId = await dispatcher.dispatch(task);
    const status = await dispatcher.getStatus(taskId);
    expect(status).not.toBeNull();
    expect(status?.task_id).toBe(taskId);
    expect(status?.agent_id).toBe('vulnhunter-001');
  });

  it('should return null for non-existent task', async () => {
    const status = await dispatcher.getStatus('nonexistent-task-id');
    expect(status).toBeNull();
  });

  it('should cancel task', async () => {
    const task = {
      agent_id: 'exploiter-001',
      task_type: 'exploit',
      payload: { cve: 'CVE-2024-0001' }
    };
    const taskId = await dispatcher.dispatch(task);
    const canceled = await dispatcher.cancel(taskId);
    expect(canceled).toBe(true);
  });

  it('should list active tasks', async () => {
    await dispatcher.dispatch({ agent_id: 'a1', task_type: 't1', payload: {} });
    await dispatcher.dispatch({ agent_id: 'a2', task_type: 't2', payload: {} });
    const tasks = dispatcher.listActiveTasks();
    expect(tasks).toHaveLength(2);
  });
});