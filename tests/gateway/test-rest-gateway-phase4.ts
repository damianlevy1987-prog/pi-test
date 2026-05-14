import request from 'supertest';
import jwt from 'jsonwebtoken';
import { describe, expect, it } from 'vitest';
import { app } from '../../src/gateway/rest-gateway';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-jwt-secret';

describe('REST Gateway phase 4', () => {
  it('refreshes access token', async () => {
    const tokenRes = await request(app).post('/auth/token').send({ subject: 'u4', role: 'analyst' });
    const refreshRes = await request(app)
      .post('/auth/refresh')
      .send({ refreshToken: tokenRes.body.refreshToken });

    expect(refreshRes.status).toBe(200);
    expect(typeof refreshRes.body.token).toBe('string');
  });

  it('rejects malformed JWT', async () => {
    const res = await request(app)
      .get('/api/agents')
      .set('authorization', 'Bearer not-a-jwt');
    expect(res.status).toBe(401);
  });

  it('rejects expired JWT', async () => {
    const expired = jwt.sign({ sub: 'u5', role: 'analyst', jti: 'old' }, JWT_SECRET, { expiresIn: -1 });
    const res = await request(app)
      .get('/api/agents')
      .set('authorization', `Bearer ${expired}`);
    expect(res.status).toBe(401);
  });

  it('revokes refresh token', async () => {
    const tokenRes = await request(app).post('/auth/token').send({ subject: 'u6', role: 'analyst' });
    await request(app).post('/auth/revoke').send({ refreshToken: tokenRes.body.refreshToken });

    const refreshRes = await request(app)
      .post('/auth/refresh')
      .send({ refreshToken: tokenRes.body.refreshToken });
    expect(refreshRes.status).toBe(401);
  });

  it('returns requestId in API responses', async () => {
    const res = await request(app)
      .get('/api/agents')
      .set('x-api-key', 'dev-api-key')
      .set('x-request-id', 'req-test-123');
    expect(res.status).toBe(200);
    expect(res.body.requestId).toBe('req-test-123');
  });
});
