import { describe, it, expect } from 'vitest';
import { WebBreakerAgent } from '../../src/agents/specialists/webbreaker-expanded';
import { AirWaveAgent } from '../../src/agents/specialists/webbreaker-expanded';
import { CloudBreacherAgent } from '../../src/agents/specialists/cloud-expanded';

describe('WebBreakerAgent', () => {
  it('should have 10 sub-agents', () => { const a = new WebBreakerAgent(); expect(a.getSubAgents().length).toBe(10); });
});

describe('AirWaveAgent', () => {
  it('should have 10 sub-agents', () => { const a = new AirWaveAgent(); expect(a.getSubAgents().length).toBe(10); });
});

describe('CloudBreacherAgent', () => {
  it('should have 10 sub-agents', () => { const a = new CloudBreacherAgent(); expect(a.getSubAgents().length).toBe(10); });
});