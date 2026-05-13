import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ResearchService } from '../../src/services/research-service';

describe('ResearchService', () => {
  let researchService: ResearchService;
  let mockEventBus: any;

  beforeEach(() => {
    mockEventBus = {
      publish: vi.fn().mockResolvedValue(undefined),
      subscribe: vi.fn()
    };
    researchService = new ResearchService(mockEventBus);
  });

  it('should handle research request event', async () => {
    const request = {
      topic: 'CVE-2024-1234',
      sources: ['web', 'database'],
      options: { depth: 'shallow' }
    };
    
    const result = await researchService.handleRequest(request);
    
    expect(result).toHaveProperty('topic');
    expect(result).toHaveProperty('results');
  });

  it('should support all source combinations', async () => {
    const sources = ['web', 'database', 'file', 'web+database', 'all'];
    
    for (const source of sources) {
      const result = await researchService.handleRequest({
        topic: 'test',
        sources: [source]
      });
      expect(result).toBeDefined();
    }
  });
});
