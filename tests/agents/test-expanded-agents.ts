import { describe, it, expect } from 'vitest';
import { ExpandedScout, ExpandedVulnHunter } from '../../src/agents/expanded/scout-expanded';

describe('Expanded Specialist Agents', () => {
  it('Scout should have 10 sub-agents', () => {
    const scout = new ExpandedScout();
    expect(scout.getSubAgents().length).toBe(10);
  });

  it('VulnHunter should have 10 sub-agents', () => {
    const vuln = new ExpandedVulnHunter();
    expect(vuln.getSubAgents().length).toBe(10);
  });
});