import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import pg from 'pg';

const { Client } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.log('DATABASE_URL not set, skipping migration.');
  process.exit(0);
}

const schemaPath = resolve(process.cwd(), 'src/database/schema.sql');
const schemaSql = readFileSync(schemaPath, 'utf-8');

const client = new Client({ connectionString: databaseUrl });

try {
  await client.connect();
  await client.query(schemaSql);
  console.log('Database migration completed successfully.');
} catch (error) {
  console.error('Database migration failed:', error);
  process.exitCode = 1;
} finally {
  await client.end();
}
