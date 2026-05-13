export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export class DatabaseConnection {
  private config: DatabaseConfig;
  private static instance: DatabaseConnection | null = null;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection({
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT || '5432'),
        database: process.env.POSTGRES_DB || 'ai_os_security',
        user: process.env.POSTGRES_USER || 'ai_os',
        password: process.env.POSTGRES_PASSWORD || ''
      });
    }
    return DatabaseConnection.instance;
  }

  getConfig(): DatabaseConfig { return this.config; }
  async connect(): Promise<void> { console.log('Database: Connecting to', this.config.database); }
  async disconnect(): Promise<void> { console.log('Database: Disconnected'); }
}