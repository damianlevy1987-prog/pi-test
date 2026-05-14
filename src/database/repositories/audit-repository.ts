export interface AuditEvent {
  eventType: string;
  sourceService: string;
  payload: any;
  metadata?: any;
}

export class AuditRepository {
  async save(event: AuditEvent): Promise<void> {
    console.log('AuditRepository: Saving event', event.eventType);
  }
  async findByType(eventType: string): Promise<AuditEvent[]> {
    console.log('Finding by type:', eventType);
    return [];
  }
}