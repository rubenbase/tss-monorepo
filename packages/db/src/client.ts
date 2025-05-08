import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { dbEnvs } from '@acme/env/db';

export const sql = neon(dbEnvs.DATABASE_URL);
export const db = drizzle(sql, { schema });
