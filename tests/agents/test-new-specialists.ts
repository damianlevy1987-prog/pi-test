import { describe, it, expect } from 'vitest';
import { IoTScanner, MobileGuardian, IndustrialGuard } from '../../src/agents/specialists/iot-scanner';

describe('New Specialist Agents', () => {
  it('IoTScanner should have 5 sub-agents', () => {
    const agent = new IoTScanner();
    expect(agent.getSubAgents().length).toBe(5);
  });

  it('MobileGuardian should have 5 sub-agents', () => {
    const agent = new MobileGuardian();
    expect(agent.getSubAgents().length).toBe(5);
  });

  it('IndustrialGuard should have 5 sub-agents', () => {
    const agent = new IndustrialGuard();
    expect(agent.getSubAgents().length).toBe(5);
  });
});