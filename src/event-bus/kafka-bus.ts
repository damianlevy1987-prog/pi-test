import { EventBus, EventHandler } from './index';

export interface KafkaEventBusConfig {
  brokers: string[];
  clientId: string;
  groupId: string;
}

export class KafkaEventBus implements EventBus {
  private handlers: Map<string, Set<EventHandler>> = new Map();
  private config: KafkaEventBusConfig;
  private connected: boolean = false;
  
  constructor(config: KafkaEventBusConfig) {
    this.config = config;
  }
  
  async connect(): Promise<void> {
    console.log('KafkaEventBus: Connecting to', this.config.brokers);
    this.connected = true;
  }
  
  async disconnect(): Promise<void> {
    console.log('KafkaEventBus: Disconnected');
    this.connected = false;
  }
  
  async subscribe(event: string, handler: EventHandler): Promise<void> {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
  }
  
  async publish(event: string, data: any): Promise<void> {
    console.log(`KafkaEventBus: Publishing ${event}`, data);
    const handlers = this.handlers.get(event);
    if (handlers) {
      for (const handler of handlers) {
        await handler(data);
      }
    }
  }
  
  isConnected(): boolean { return this.connected; }
}