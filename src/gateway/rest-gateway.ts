import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { logAuditEvent } from '../utils/audit-logger';

const API_KEY = process.env.API_KEY ?? 'dev-api-key';

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

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const provided = req.header('x-api-key');
  if (!provided || provided !== API_KEY) {
    logAuditEvent({
      eventType: 'auth_failed',
      path: req.path,
      method: req.method,
      ip: req.ip,
    });
    res.status(401).json({ error: 'Unauthorized' });
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

app.post('/api/research', async (req: Request, res: Response) => {
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

app.post('/api/context', async (req: Request, res: Response) => {
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

app.post('/api/dispatch', async (req: Request, res: Response) => {
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

app.get('/api/agents', (_req: Request, res: Response) => {
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
