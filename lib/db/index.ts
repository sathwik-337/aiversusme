import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';
import * as schema from './schema';

// Configure neon to use fetch API properly in Next.js edge/serverless environments
neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  dotenv.config({ path: '.env' });
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env file');
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
