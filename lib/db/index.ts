import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';
import * as schema from './schema';

// Configure neon to use fetch API properly in Next.js edge/serverless environments
// neonConfig.fetchConnectionCache = true; // This is deprecated

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Clean the URL if it contains quotes
const cleanUrl = databaseUrl.replace(/^["']|["']$/g, '');

export const sql = neon(cleanUrl);
export const db = drizzle(sql, { schema });
