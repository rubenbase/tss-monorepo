import type { Config } from 'drizzle-kit';
import { dbEnvs } from '@acme/env/db';

export default {
  dialect: 'postgresql',
  schema: './src/schema.ts',
  out: './src/migrations',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: dbEnvs.DATABASE_URL,
  },
} satisfies Config;
