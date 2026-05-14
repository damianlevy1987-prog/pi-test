import { describe, it, expect, beforeEach } from 'vitest';
import { ResearchService } from '../../src/services/research-service';
import { EventBus } from '../../src/event-bus';

describe('ResearchService', () => {
  let eventBus: EventBus;
  let researchService: ResearchService;

  beforeEach(() => {
    eventBus = new EventBus();
    researchService = new ResearchService(eventBus);
  });

  it('should handle research request with web source', async () => {
    const request = {
      topic: 'SQL injection',
      sources: ['web'],
      options: { depth: 'shallow' as const }
    };
    const result = await researchService.handleRequest(request);
    expect(result.topic).toBe('SQL injection');
    expect(result.metadata.sources_used).toContain('web');
  });

  it('should handle research request with multiple sources', async () => {
    const request = {
      topic: 'XSS vulnerability',
      sources: ['web', 'database', 'file'],
      options: { depth: 'deep' as const }
    };
    const result = await researchService.handleRequest(request);
    expect(result.topic).toBe('XSS vulnerability');
    expect(result.metadata.sources_used).toHaveLength(3);
  });

  it('should handle research request with empty sources', async () => {
    const request = {
      topic: 'CSRF',
      sources: []
    };
    const result = await researchService.handleRequest(request);
    expect(result.results).toHaveLength(0);
    expect(result.metadata.sources_used).toHaveLength(0);
  });

  it('should track metadata correctly', async () => {
    const request = {
      topic: 'buffer overflow',
      sources: ['web']
    };
    const result = await researchService.handleRequest(request);
    expect(result.metadata.duration).toBeGreaterThanOrEqual(0);
    expect(result.metadata.items_found).toBe(0);
  });
});