export interface SystemConfig {
  mode: 'production' | 'development' | 'hybrid';
  kafka?: KafkaConfig;
  postgresql?: PostgreSQLConfig;
  redis?: RedisConfig;
}

export interface KafkaConfig {
  brokers: string[];
  clientId: string;
  consumerGroup: string;
}

export interface PostgreSQLConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export interface RedisConfig {
  host: string;
  port: number;
}

export const defaultConfig: SystemConfig = {
  mode: 'development'
};