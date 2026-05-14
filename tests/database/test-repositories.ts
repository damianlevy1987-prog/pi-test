import { describe, it, expect } from 'vitest';
import { AuditRepository } from '../../src/database/repositories/audit-repository';

describe('Database Repositories', () => {
  it('should create audit repository', () => {
    const repo = new AuditRepository();
    expect(repo).toBeDefined();
  });
});