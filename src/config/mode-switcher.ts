import { SystemConfig } from './system-config';

export class ModeSwitcher {
  private config: SystemConfig;
  
  constructor() {
    this.config = {
      mode: (process.env.AI_OS_MODE as any) || 'development'
    };
  }

  getMode(): 'production' | 'development' | 'hybrid' {
    return this.config.mode;
  }

  setMode(mode: 'production' | 'development' | 'hybrid'): void {
    this.config.mode = mode;
  }

  getEventBusType(): 'kafka' | 'in-memory' {
    return this.config.mode === 'production' ? 'kafka' : 'in-memory';
  }

  getPersistenceType(): 'postgresql' | 'none' {
    return this.config.mode === 'production' ? 'postgresql' : 'none';
  }

  getConfig(): SystemConfig {
    return this.config;
  }
}