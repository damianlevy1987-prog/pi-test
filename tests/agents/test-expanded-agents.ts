import { describe, it, expect } from 'vitest';
import { ExpandedExploiter, ExpandedShadowOps } from '../../src/agents/expanded/exploiter-expanded';

describe('Expanded Exploiter', () => {
  it('should have 10 sub-agents', () => { 
    const e = new ExpandedExploiter(); 
    expect(e.getSubAgents().length).toBe(10); 
  });

  it('should execute sql_injection', async () => { 
    const e = new ExpandedExploiter(); 
    const r = await e.execute('sql_injection', { target: 'test' }); 
    expect(r.type).toBe('sql_injection'); 
  });

  it('should execute xss_exploiter', async () => { 
    const e = new ExpandedExploiter(); 
    const r = await e.execute('xss_exploiter', { target: 'test' }); 
    expect(r.type).toBe('xss'); 
  });

  it('should execute rce_exploiter', async () => { 
    const e = new ExpandedExploiter(); 
    const r = await e.execute('rce_exploiter', { target: 'test' }); 
    expect(r.type).toBe('rce'); 
  });

  it('should throw for unknown sub-agent', async () => { 
    const e = new ExpandedExploiter(); 
    await expect(e.execute('unknown', {})).rejects.toThrow('Sub-agent unknown not found'); 
  });
});

describe('Expanded ShadowOps', () => {
  it('should have 10 sub-agents', () => { 
    const s = new ExpandedShadowOps(); 
    expect(s.getSubAgents().length).toBe(10); 
  });

  it('should execute covert_channel', async () => { 
    const s = new ExpandedShadowOps(); 
    const r = await s.execute('covert_channel', { target: 'test' }); 
    expect(r.type).toBe('covert'); 
  });

  it('should execute persistence_implant', async () => { 
    const s = new ExpandedShadowOps(); 
    const r = await s.execute('persistence_implant', { target: 'test' }); 
    expect(r.type).toBe('persistence'); 
  });

  it('should execute data_exfil', async () => { 
    const s = new ExpandedShadowOps(); 
    const r = await s.execute('data_exfil', { target: 'test' }); 
    expect(r.type).toBe('exfil'); 
  });

  it('should throw for unknown sub-agent', async () => { 
    const s = new ExpandedShadowOps(); 
    await expect(s.execute('unknown', {})).rejects.toThrow('Sub-agent unknown not found'); 
  });
});