export interface WebSourceConfig {
  name: string;
  type: 'api' | 'scraping';
  apiKey?: string;
  priority: number;
}

export interface WebHandlerConfig {
  mode: 'api' | 'scraping' | 'hybrid';
  sources: WebSourceConfig[];
  fallback: { enabled: boolean; fallbackOrder: string[] };
}