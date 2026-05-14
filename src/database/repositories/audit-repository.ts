import { getPgPool } from '../pg-client';

export interface AuditEvent {
  eventType: string;
  sourceService: string;
  payload: unknown;
  metadata?: unknown;
}

const memoryAuditEvents: AuditEvent[] = [];

export class AuditRepository {
  async save(event: AuditEvent): Promise<void> {
    const pool = getPgPool();

    if (pool) {
      await pool.query(
        `INSERT INTO audit_events (event_type, source_service, payload, metadata)
         VALUES ($1, $2, $3::jsonb, $4::jsonb)`,
        [event.eventType, event.sourceService, JSON.stringify(event.payload), JSON.stringify(event.metadata ?? {})],
      );
      return;
    }

    memoryAuditEvents.push(event);
  }

  async findByType(eventType: string): Promise<AuditEvent[]> {
    const pool = getPgPool();

    if (pool) {
      const { rows } = await pool.query(
        `SELECT event_type, source_service, payload, metadata
         FROM audit_events
         WHERE event_type = $1
         ORDER BY created_at DESC
         LIMIT 100`,
        [eventType],
      );

      return rows.map((row: { event_type: string; source_service: string; payload: unknown; metadata: unknown }) => ({
        eventType: row.event_type as string,
        sourceService: row.source_service as string,
        payload: row.payload,
        metadata: row.metadata,
      }));
    }

    return memoryAuditEvents.filter((e) => e.eventType === eventType);
  }
}
