import { describe, it, expect } from 'vitest';
import { WebHandler } from '../../src/handlers/web-handler';
import { DatabaseHandler } from '../../src/handlers/database-handler';
import { FileHandler } from '../../src/handlers/file-handler';

describe('Source Handlers', () => {
  describe('WebHandler', () => {
    it('should search web for topic', async () => {
      const handler = new WebHandler();
      const results = await handler.search('CVE-2024-1234');
      expect(Array.isArray(results)).toBe(true);
    });

    it('should search security blogs', async () => {
      const handler = new WebHandler();
      const results = await handler.searchSecurityBlogs('pentest');
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe('DatabaseHandler', () => {
    it('should query CVE database', async () => {
      const handler = new DatabaseHandler();
      const results = await handler.queryCVE('CVE-2024-1234');
      expect(Array.isArray(results)).toBe(true);
    });

    it('should query exploit-db', async () => {
      const handler = new DatabaseHandler();
      const results = await handler.queryExploitDB('exploit');
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe('FileHandler', () => {
    it('should search local files', async () => {
      const handler = new FileHandler();
      const results = await handler.search('/tmp', 'test');
      expect(Array.isArray(results)).toBe(true);
    });

    it('should handle glob patterns', async () => {
      const handler = new FileHandler();
      const results = await handler.glob('*.log', '/tmp');
      expect(Array.isArray(results)).toBe(true);
    });
  });
});