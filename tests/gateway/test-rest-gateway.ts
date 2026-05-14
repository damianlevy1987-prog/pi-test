import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../src/gateway/rest-gateway';

describe('REST Gateway hardening', () => {
  it('rejects missing API key', async () => {
    const res = await request(app).get('/api/agents');
    expect(res.status).toBe(401);
  });

  it('accepts valid API key', async () => {
    const res = await request(app).get('/api/agents').set('x-api-key', 'dev-api-key');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('validates research payload', async () => {
    const res = await request(app)
      .post('/api/research')
      .set('x-api-key', 'dev-api-key')
      .send({ topic: '', sources: [] });
    expect(res.status).toBe(400);
  });

  it('accepts valid research payload', async () => {
    const res = await request(app)
      .post('/api/research')
      .set('x-api-key', 'dev-api-key')
      .send({ topic: 'xss', sources: ['web'] });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
  });
});
