import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as dotenv from 'dotenv';
import * as schema from './schema';
import ws from 'ws';

// Set up WebSocket for Node.js environments (like migrations)
if (typeof WebSocket === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

// Use WebSocket driver for better transaction support in serverless environments
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Clean the URL if it contains quotes
const cleanUrl = databaseUrl.replace(/^["']|["']$/g, '');

// Create a pool for neon-serverless (WebSockets)
export const pool = new Pool({ connectionString: cleanUrl });
export const db = drizzle(pool, { schema });
