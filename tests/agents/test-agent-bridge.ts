import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AgentBridge } from '../../src/agents/agent-bridge';

describe('AgentBridge', () => {
  let bridge: AgentBridge;
  let mockEventBus: any;

  beforeEach(() => {
    mockEventBus = { publish: vi.fn().mockResolvedValue(undefined), subscribe: vi.fn() };
    bridge = new AgentBridge(mockEventBus);
  });

  it('should connect to all 10 specialist agents', async () => {
    const agents = bridge.getConnectedAgents();
    expect(agents.length).toBe(10);
  });

  it('should trigger from agent', async () => {
    const result = await bridge.triggerFromAgent('scout', { action: 'recon', target: 'target.com' });
    expect(result).toBeDefined();
    expect(result.status).toBe('queued'); // No integration service set
  });

  it('should receive from agent', async () => {
    const result = await bridge.receiveFromAgent('scout', { data: 'test' });
    expect(result).toEqual({ status: 'received', agent: 'scout' });
  });

  it('should publish events', async () => {
    await bridge.triggerFromAgent('vulnhunter', { action: 'scan', target: '10.0.0.1' });
    expect(mockEventBus.publish).toHaveBeenCalledWith('agent.triggered', expect.any(Object));
  });
});