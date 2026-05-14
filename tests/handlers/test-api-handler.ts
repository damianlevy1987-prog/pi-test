import { describe, it, expect } from 'vitest';
import { APIHandler } from '../../src/handlers/api-handler';
import { ScrapingHandler } from '../../src/handlers/scraping-handler';

describe('APIHandler', () => {
  it('should create handler', () => { const h = new APIHandler('https://api.test.com'); expect(h).toBeDefined(); });
  it('should search shodan', async () => { const h = new APIHandler(''); const r = await h.searchShodan('test'); expect(r[0].source).toBe('shodan'); });
});

describe('ScrapingHandler', () => {
  it('should create handler', () => { const h = new ScrapingHandler(); expect(h).toBeDefined(); });
  it('should extract links', async () => { const h = new ScrapingHandler(); const links = await h.extractLinks('<a href="test">test</a>'); expect(links).toContain('test'); });
});