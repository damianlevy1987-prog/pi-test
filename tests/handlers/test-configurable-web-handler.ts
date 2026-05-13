import { describe, it, expect } from 'vitest';
import { ConfigurableWebHandler } from '../../src/handlers/configurable-web-handler';

describe('ConfigurableWebHandler', () => {
  it('should support API mode', () => {
    const handler = new ConfigurableWebHandler({ mode: 'api', sources: [] });
    expect(handler.getMode()).toBe('api');
  });

  it('should support scraping mode', () => {
    const handler = new ConfigurableWebHandler({ mode: 'scraping', sources: [] });
    expect(handler.getMode()).toBe('scraping');
  });

  it('should support hybrid mode', () => {
    const handler = new ConfigurableWebHandler({ mode: 'hybrid', sources: [] });
    expect(handler.getMode()).toBe('hybrid');
  });
});