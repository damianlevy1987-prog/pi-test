export interface LogEntry {
  timestamp: number;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  data?: any;
}

export function formatLog(entry: LogEntry): string {
  return `[${new Date(entry.timestamp).toISOString()}] [${entry.level.toUpperCase()}] ${entry.message}`;
}

export function parseResults(results: any[]): string {
  return JSON.stringify(results, null, 2);
}