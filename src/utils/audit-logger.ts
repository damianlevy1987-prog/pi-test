import { AuditRepository } from '../database/repositories/audit-repository';

export type AuditEventType =
  | 'auth_failed'
  | 'validation_failed'
  | 'request_accepted'
  | 'request_error';

export interface AuditEvent {
  eventType: AuditEventType;
  path: string;
  method: string;
  ip?: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

const auditRepository = new AuditRepository();

export function logAuditEvent(event: Omit<AuditEvent, 'timestamp'>): void {
  const payload: AuditEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  };

  void auditRepository.save({
    eventType: payload.eventType,
    sourceService: 'rest-gateway',
    payload,
    metadata: { path: payload.path, method: payload.method },
  });

  console.log(JSON.stringify({ audit: payload }));
}
