import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../src/gateway/rest-gateway';

describe('REST Gateway phase 3', () => {
  it('issues a JWT token', async () => {
    const res = await request(app).post('/auth/token').send({ subject: 'u1', role: 'analyst' });
    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe('string');
  });

  it('enforces RBAC on /api/dispatch for analyst', async () => {
    const tokenRes = await request(app)
      .post('/auth/token')
      .send({ subject: 'u2', role: 'analyst' });

    const res = await request(app)
      .post('/api/dispatch')
      .set('authorization', `Bearer ${tokenRes.body.token}`)
      .send({ agent: 'scout', task: { action: 'scan' } });

    expect(res.status).toBe(403);
  });

  it('allows operator on /api/dispatch', async () => {
    const tokenRes = await request(app)
      .post('/auth/token')
      .send({ subject: 'u3', role: 'operator' });

    const res = await request(app)
      .post('/api/dispatch')
      .set('authorization', `Bearer ${tokenRes.body.token}`)
      .send({ agent: 'scout', task: { action: 'scan' } });

    expect(res.status).toBe(200);
  });

  it('serves swagger UI endpoint', async () => {
    const res = await request(app).get('/docs');
    expect([200, 301, 302]).toContain(res.status);
  });
});
