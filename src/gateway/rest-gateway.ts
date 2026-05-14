import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import swaggerUi from 'swagger-ui-express';
import { z } from 'zod';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import { logAuditEvent } from '../utils/audit-logger';
import {
  createRefreshSession,
  isJtiRevoked,
  readRefreshSession,
  revokeJti,
  revokeRefreshSession,
} from '../security/token-store';
import { incrementMetric, renderPrometheusMetrics } from '../observability/metrics';

const API_KEY = process.env.API_KEY ?? 'dev-api-key';
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-jwt-secret';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000,http://localhost:5173').split(',');

type Role = 'analyst' | 'operator' | 'admin';

interface AuthenticatedRequest extends Request {
  user?: { sub: string; role: Role; jti?: string };
  requestId?: string;
}

const issueAccessToken = (sub: string, role: Role): string => {
  const jti = randomUUID();
  return jwt.sign({ sub, role, jti }, JWT_SECRET, { expiresIn: '1h' });
};

const hashIdentity = (value: string): string => createHash('sha256').update(value).digest('hex').slice(0, 16);

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'x-request-id'],
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use((req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  req.requestId = req.header('x-request-id') ?? randomUUID();
  incrementMetric('requests_total');
  next();
});

app.use(
  '/api',
  rateLimit({
    windowMs: 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX ?? 120),
    keyGenerator: (req) => {
      const apiKey = req.header('x-api-key');
      if (apiKey) return `api-key:${hashIdentity(apiKey)}`;

      const auth = req.header('authorization');
      if (auth?.startsWith('Bearer ')) return `bearer:${hashIdentity(auth.slice(7))}`;

      return `ip:${req.ip}`;
    },
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

const openApiSpec = readFileSync(resolve(process.cwd(), 'docs/openapi.yaml'), 'utf-8');
app.get('/openapi.yaml', (_req: Request, res: Response) => {
  res.type('application/yaml').send(openApiSpec);
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, { swaggerOptions: { url: '/openapi.yaml' } }));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/ready', async (_req: Request, res: Response) => {
  // Ready when process can issue a token and verify it.
  try {
    const token = issueAccessToken('readiness-check', 'analyst');
    jwt.verify(token, JWT_SECRET);
    res.json({ status: 'ready' });
  } catch {
    res.status(503).json({ status: 'not-ready' });
  }
});

app.get('/metrics', (_req: Request, res: Response) => {
  res.type('text/plain').send(renderPrometheusMetrics());
});

const issueTokenSchema = z.object({
  subject: z.string().min(1),
  role: z.enum(['analyst', 'operator', 'admin']),
});
const refreshSchema = z.object({ refreshToken: z.string().min(1) });
const revokeSchema = z.object({ refreshToken: z.string().min(1).optional(), accessToken: z.string().min(1).optional() });

app.post('/auth/token', async (req: Request, res: Response) => {
  const parsed = issueTokenSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid request payload', issues: parsed.error.issues });
    return;
  }

  const token = issueAccessToken(parsed.data.subject, parsed.data.role);
  const refreshToken = await createRefreshSession(parsed.data.subject, parsed.data.role);
  res.json({ token, refreshToken });
});

app.post('/auth/refresh', async (req: Request, res: Response) => {
  const parsed = refreshSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid request payload', issues: parsed.error.issues });
    return;
  }

  const session = await readRefreshSession(parsed.data.refreshToken);
  if (!session) {
    res.status(401).json({ error: 'Invalid refresh token' });
    return;
  }

  const token = issueAccessToken(session.sub, session.role);
  res.json({ token });
});

app.post('/auth/revoke', async (req: Request, res: Response) => {
  const parsed = revokeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid request payload', issues: parsed.error.issues });
    return;
  }

  if (parsed.data.refreshToken) await revokeRefreshSession(parsed.data.refreshToken);
  if (parsed.data.accessToken) {
    const decoded = jwt.decode(parsed.data.accessToken) as { jti?: string } | null;
    if (decoded?.jti) await revokeJti(decoded.jti);
  }

  res.json({ status: 'revoked' });
});

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const providedApiKey = req.header('x-api-key');
  const authHeader = req.header('authorization');

  if (providedApiKey && providedApiKey === API_KEY) {
    req.user = { sub: 'api-key-user', role: 'admin' };
    next();
    return;
  }

  if (!authHeader?.startsWith('Bearer ')) {
    logAuditEvent({ eventType: 'auth_failed', path: req.path, method: req.method, ip: req.ip, details: { requestId: req.requestId } });
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = authHeader.slice('Bearer '.length);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string; role: Role; jti?: string };
    if (decoded.jti && (await isJtiRevoked(decoded.jti))) {
      res.status(401).json({ error: 'Token revoked' });
      return;
    }

    req.user = { sub: decoded.sub, role: decoded.role, jti: decoded.jti };
    next();
  } catch {
    logAuditEvent({ eventType: 'auth_failed', path: req.path, method: req.method, ip: req.ip, details: { requestId: req.requestId } });
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const ROUTE_POLICIES: Record<'research' | 'context' | 'dispatch' | 'agents', Role[]> = {
  research: ['analyst', 'operator', 'admin'],
  context: ['analyst', 'operator', 'admin'],
  dispatch: ['operator', 'admin'],
  agents: ['analyst', 'operator', 'admin'],
};

const requirePolicy = (policy: keyof typeof ROUTE_POLICIES) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const role = req.user?.role;
  if (!role || !ROUTE_POLICIES[policy].includes(role)) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  next();
};

app.use('/api', authMiddleware);

const researchSchema = z.object({
  topic: z.string().min(1).max(500),
  sources: z.array(z.enum(['web', 'database', 'file', 'api'])).min(1),
});
const contextSchema = z.object({ agent_id: z.string().min(1), topic: z.string().min(1).max(500) });
const dispatchSchema = z.object({
  agent: z.string().min(1),
  task: z.object({ action: z.string().min(1), target: z.string().min(1).optional() }),
});

app.post('/api/research', requirePolicy('research'), async (req: AuthenticatedRequest, res: Response) => {
  const parsed = researchSchema.safeParse(req.body);
  if (!parsed.success) {
    logAuditEvent({ eventType: 'validation_failed', path: req.path, method: req.method, ip: req.ip, details: { requestId: req.requestId, issues: parsed.error.issues } });
    res.status(400).json({ error: 'Invalid request payload', issues: parsed.error.issues });
    return;
  }
  const { topic, sources } = parsed.data;
  logAuditEvent({ eventType: 'request_accepted', path: req.path, method: req.method, ip: req.ip, details: { requestId: req.requestId } });
  incrementMetric('research_requests_total');
  res.json({ status: 'success', topic, sources, requestId: req.requestId });
});

app.post('/api/context', requirePolicy('context'), async (req: AuthenticatedRequest, res: Response) => {
  const parsed = contextSchema.safeParse(req.body);
  if (!parsed.success) {
    logAuditEvent({ eventType: 'validation_failed', path: req.path, method: req.method, ip: req.ip, details: { requestId: req.requestId, issues: parsed.error.issues } });
    res.status(400).json({ error: 'Invalid request payload', issues: parsed.error.issues });
    return;
  }
  const { agent_id, topic } = parsed.data;
  logAuditEvent({ eventType: 'request_accepted', path: req.path, method: req.method, ip: req.ip, details: { requestId: req.requestId } });
  incrementMetric('context_requests_total');
  res.json({ status: 'success', agent_id, topic, requestId: req.requestId });
});

app.post('/api/dispatch', requirePolicy('dispatch'), async (req: AuthenticatedRequest, res: Response) => {
  const parsed = dispatchSchema.safeParse(req.body);
  if (!parsed.success) {
    logAuditEvent({ eventType: 'validation_failed', path: req.path, method: req.method, ip: req.ip, details: { requestId: req.requestId, issues: parsed.error.issues } });
    res.status(400).json({ error: 'Invalid request payload', issues: parsed.error.issues });
    return;
  }
  const { agent, task } = parsed.data;
  logAuditEvent({ eventType: 'request_accepted', path: req.path, method: req.method, ip: req.ip, details: { requestId: req.requestId } });
  incrementMetric('dispatch_requests_total');
  res.json({ status: 'success', agent, task, requestId: req.requestId });
});

app.get('/api/agents', requirePolicy('agents'), (req: AuthenticatedRequest, res: Response) => {
  res.json({
    agents: ['scout', 'vulnhunter', 'exploiter', 'shadowops', 'webbreaker', 'airwave', 'digitalwatcher', 'cloudbreacher', 'domainhunter', 'humanphisher'],
    requestId: req.requestId,
  });
});

export { app, issueAccessToken };
