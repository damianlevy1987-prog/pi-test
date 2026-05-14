import { randomUUID } from 'node:crypto';
import { getPgPool } from '../database/pg-client';

type Role = 'analyst' | 'operator' | 'admin';

interface SessionData {
  sub: string;
  role: Role;
}

const memorySessions = new Map<string, SessionData>();
const revokedJtis = new Set<string>();

export async function createRefreshSession(sub: string, role: Role): Promise<string> {
  const token = randomUUID();
  const pool = getPgPool();

  if (pool) {
    await pool.query(
      `INSERT INTO auth_refresh_tokens (token, subject, role, revoked) VALUES ($1, $2, $3, false)
       ON CONFLICT (token) DO UPDATE SET subject = EXCLUDED.subject, role = EXCLUDED.role, revoked = false`,
      [token, sub, role],
    );
    return token;
  }

  memorySessions.set(token, { sub, role });
  return token;
}

export async function readRefreshSession(token: string): Promise<SessionData | null> {
  const pool = getPgPool();

  if (pool) {
    const { rows } = await pool.query(
      'SELECT subject, role FROM auth_refresh_tokens WHERE token = $1 AND revoked = false',
      [token],
    );
    if (rows.length === 0) return null;
    return { sub: rows[0].subject as string, role: rows[0].role as Role };
  }

  return memorySessions.get(token) ?? null;
}

export async function revokeRefreshSession(token: string): Promise<void> {
  const pool = getPgPool();

  if (pool) {
    await pool.query('UPDATE auth_refresh_tokens SET revoked = true WHERE token = $1', [token]);
    return;
  }

  memorySessions.delete(token);
}

export async function revokeJti(jti: string): Promise<void> {
  const pool = getPgPool();

  if (pool) {
    await pool.query(
      `INSERT INTO auth_revoked_tokens (jti) VALUES ($1)
       ON CONFLICT (jti) DO NOTHING`,
      [jti],
    );
    return;
  }

  revokedJtis.add(jti);
}

export async function isJtiRevoked(jti: string): Promise<boolean> {
  const pool = getPgPool();

  if (pool) {
    const { rows } = await pool.query('SELECT 1 FROM auth_revoked_tokens WHERE jti = $1 LIMIT 1', [jti]);
    return rows.length > 0;
  }

  return revokedJtis.has(jti);
}
