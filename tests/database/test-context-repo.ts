import { describe, it, expect } from 'vitest';
import { ContextRepository } from '../../src/database/repositories/context-repository';
import { ResearchRepository } from '../../src/database/repositories/research-repository';

describe('ContextRepository', () => {
  it('should save context', async () => {
    const repo = new ContextRepository();
    await repo.save({ id: '1', agentId: 'test', topic: 'test', contextType: 'test', contextData: {}, createdAt: new Date() });
    const found = await repo.findByAgent('test');
    expect(found.length).toBe(1);
  });
});

describe('ResearchRepository', () => {
  it('should save research', async () => {
    const repo = new ResearchRepository();
    await repo.save({ id: '1', topic: 'test', sourcesUsed: [], results: {}, metadata: {}, createdAt: new Date() });
    const found = await repo.findByTopic('test');
    expect(found.length).toBe(1);
  });
});