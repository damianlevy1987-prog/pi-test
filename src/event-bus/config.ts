export interface EventBusConfig {
  maxHandlersPerEvent?: number;
  enableLogging?: boolean;
  defaultTimeout?: number;
}

export const defaultEventBusConfig: EventBusConfig = {
  maxHandlersPerEvent: 100,
  enableLogging: false,
  defaultTimeout: 30000,
};

export function getConfig(config?: Partial<EventBusConfig>): EventBusConfig {
  return {
    ...defaultEventBusConfig,
    ...config,
  };
}