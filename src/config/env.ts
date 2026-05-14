import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  API_KEY: z.string().default('dev-api-key'),
  JWT_SECRET: z.string().default('dev-jwt-secret'),
  DATABASE_URL: z.string().optional(),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000,http://localhost:5173'),
  RATE_LIMIT_MAX: z.coerce.number().default(120),
});

export type AppEnv = z.infer<typeof envSchema>;

export function loadEnv(): AppEnv {
  return envSchema.parse(process.env);
}
