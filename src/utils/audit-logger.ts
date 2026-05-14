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

export function logAuditEvent(event: Omit<AuditEvent, 'timestamp'>): void {
  const payload: AuditEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  };
  console.log(JSON.stringify({ audit: payload }));
}
