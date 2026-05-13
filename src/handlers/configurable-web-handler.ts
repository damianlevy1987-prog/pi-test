export class ConfigurableWebHandler {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  getMode(): 'api' | 'scraping' | 'hybrid' {
    return this.config.mode;
  }

  async search(topic: string, options?: any): Promise<any[]> {
    console.log(`ConfigurableWebHandler: Searching in ${this.config.mode} mode`);
    
    if (this.config.mode === 'api') {
      return this.searchViaAPI(topic);
    } else if (this.config.mode === 'scraping') {
      return this.searchViaScraping(topic);
    } else {
      try { return await this.searchViaAPI(topic); }
      catch { return await this.searchViaScraping(topic); }
    }
  }

  private async searchViaAPI(topic: string): Promise<any[]> {
    return [{ source: 'api', topic }];
  }

  private async searchViaScraping(topic: string): Promise<any[]> {
    return [{ source: 'scraping', topic }];
  }

  setMode(mode: 'api' | 'scraping' | 'hybrid'): void {
    this.config.mode = mode;
  }
}