import { describe, it, expect } from 'vitest';
import type { ResearchRequest, ResearchResult, ContextBuildRequest } from '../../src/services/types';

describe('Service Types', () => {
  it('should define ResearchRequest interface', () => {
    const request: ResearchRequest = {
      topic: 'vulnerability scanning',
      sources: ['web', 'database'],
      options: { depth: 'deep', timeout: 30000 }
    };
    expect(request.topic).toBe('vulnerability scanning');
    expect(request.sources).toContain('web');
    expect(request.options?.depth).toBe('deep');
  });

  it('should define ResearchResult interface', () => {
    const result: ResearchResult = {
      topic: 'penetration testing',
      results: [{ id: 1, title: 'Test' }],
      metadata: { sources_used: ['web'], duration: 100, items_found: 1 }
    };
    expect(result.results).toHaveLength(1);
    expect(result.metadata.items_found).toBe(1);
  });

  it('should define ContextBuildRequest interface', () => {
    const request: ContextBuildRequest = {
      agent_id: 'scout-001',
      topic: 'network reconnaissance',
      inputs: { target_data: { ip: '192.168.1.1' }, session_data: { token: 'abc' } }
    };
    expect(request.agent_id).toBe('scout-001');
    expect(request.inputs.target_data).toBeDefined();
  });
});