import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../src/gateway/rest-gateway';

describe('REST Gateway phase 8 abuse scenarios', () => {
  it('rejects wrong API key auth bypass attempt', async () => {
    const res = await request(app).get('/api/agents').set('x-api-key', 'wrong-key');
    expect(res.status).toBe(401);
  });

  it('rejects malformed bearer header bypass attempt', async () => {
    const res = await request(app).get('/api/agents').set('authorization', 'Bearer');
    expect(res.status).toBe(401);
  });

  it('rejects oversized payload', async () => {
    const oversized = 'A'.repeat(1_200_000);
    const res = await request(app)
      .post('/api/research')
      .set('x-api-key', 'dev-api-key')
      .send({ topic: oversized, sources: ['web'] });

    expect([400, 413]).toContain(res.status);
  });
});
