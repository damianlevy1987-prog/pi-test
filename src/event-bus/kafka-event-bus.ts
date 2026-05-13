export interface KafkaEventBusConfig {
  brokers: string[];
  clientId: string;
  topics: {
    researchRequests: string;
    researchResults: string;
    contextBuild: string;
    contextReady: string;
    dispatchAgents: string;
    agentResponses: string;
  };
}

export class KafkaEventBus {
  private config: KafkaEventBusConfig;
  private handlers: Map<string, Function[]> = new Map();

  constructor(config: KafkaEventBusConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    console.log('KafkaEventBus: Connecting to', this.config.brokers);
  }

  subscribe(event: string, handler: Function): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)!.push(handler);
  }

  async publish(event: string, payload: any): Promise<void> {
    const handlers = this.handlers.get(event) || [];
    await Promise.all(handlers.map(h => h(payload)));
  }

  async disconnect(): Promise<void> {
    console.log('KafkaEventBus: Disconnected');
  }
}