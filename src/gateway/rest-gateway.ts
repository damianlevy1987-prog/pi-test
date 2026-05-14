import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import swaggerUi from 'swagger-ui-express';
import { z } from 'zod';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { logAuditEvent } from '../utils/audit-logger';

const API_KEY = process.env.API_KEY ?? 'dev-api-key';
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-jwt-secret';

type Role = 'analyst' | 'operator' | 'admin';

interface AuthenticatedRequest extends Request {
  user?: { sub: string; role: Role };
}

const app = express();
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

const openApiSpec = readFileSync(resolve(process.cwd(), 'docs/openapi.yaml'), 'utf-8');
app.get('/openapi.yaml', (_req: Request, res: Response) => {
  res.type('application/yaml').send(openApiSpec);
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, { swaggerOptions: { url: '/openapi.yaml' } }));

const issueTokenSchema = z.object({
  subject: z.string().min(1),
  role: z.enum(['analyst', 'operator', 'admin']),
});

app.post('/auth/token', (req: Request, res: Response) => {
  const parsed = issueTokenSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid request payload', issues: parsed.error.issues });
    return;
  }

  const token = jwt.sign({ sub: parsed.data.subject, role: parsed.data.role }, JWT_SECRET, {
    expiresIn: '1h',
  });
  res.json({ token });
});

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const providedApiKey = req.header('x-api-key');
  const authHeader = req.header('authorization');

  if (providedApiKey && providedApiKey === API_KEY) {
    req.user = { sub: 'api-key-user', role: 'admin' };
    next();
    return;
  }

  if (!authHeader?.startsWith('Bearer ')) {
    logAuditEvent({ eventType: 'auth_failed', path: req.path, method: req.method, ip: req.ip });
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = authHeader.slice('Bearer '.length);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string; role: Role };
    req.user = { sub: decoded.sub, role: decoded.role };
    next();
  } catch {
    logAuditEvent({ eventType: 'auth_failed', path: req.path, method: req.method, ip: req.ip });
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const requireRole = (allowed: Role[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const role = req.user?.role;
  if (!role || !allowed.includes(role)) {
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

const contextSchema = z.object({
  agent_id: z.string().min(1),
  topic: z.string().min(1).max(500),
});

const dispatchSchema = z.object({
  agent: z.string().min(1),
  task: z.object({
    action: z.string().min(1),
    target: z.string().min(1).optional(),
  }),
});

app.post('/api/research', requireRole(['analyst', 'operator', 'admin']), async (req: Request, res: Response) => {
  const parsed = researchSchema.safeParse(req.body);
  if (!parsed.success) {
    logAuditEvent({
      eventType: 'validation_failed',
      path: req.path,
      method: req.method,
      ip: req.ip,
      details: { issues: parsed.error.issues },
    });
    res.status(400).json({ error: 'Invalid request payload', issues: parsed.error.issues });
    return;
  }

  const { topic, sources } = parsed.data;
  logAuditEvent({ eventType: 'request_accepted', path: req.path, method: req.method, ip: req.ip });
  res.json({ status: 'success', topic, sources });
});

app.post('/api/context', requireRole(['analyst', 'operator', 'admin']), async (req: Request, res: Response) => {
  const parsed = contextSchema.safeParse(req.body);
  if (!parsed.success) {
    logAuditEvent({
      eventType: 'validation_failed',
      path: req.path,
      method: req.method,
      ip: req.ip,
      details: { issues: parsed.error.issues },
    });
    res.status(400).json({ error: 'Invalid request payload', issues: parsed.error.issues });
    return;
  }

  const { agent_id, topic } = parsed.data;
  logAuditEvent({ eventType: 'request_accepted', path: req.path, method: req.method, ip: req.ip });
  res.json({ status: 'success', agent_id, topic });
});

app.post('/api/dispatch', requireRole(['operator', 'admin']), async (req: Request, res: Response) => {
  const parsed = dispatchSchema.safeParse(req.body);
  if (!parsed.success) {
    logAuditEvent({
      eventType: 'validation_failed',
      path: req.path,
      method: req.method,
      ip: req.ip,
      details: { issues: parsed.error.issues },
    });
    res.status(400).json({ error: 'Invalid request payload', issues: parsed.error.issues });
    return;
  }

  const { agent, task } = parsed.data;
  logAuditEvent({ eventType: 'request_accepted', path: req.path, method: req.method, ip: req.ip });
  res.json({ status: 'success', agent, task });
});

app.get('/api/agents', requireRole(['analyst', 'operator', 'admin']), (_req: Request, res: Response) => {
  res.json([
    'scout',
    'vulnhunter',
    'exploiter',
    'shadowops',
    'webbreaker',
    'airwave',
    'digitalwatcher',
    'cloudbreacher',
    'domainhunter',
    'humanphisher',
  ]);
});

export { app };
