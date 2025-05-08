import type { Config } from 'drizzle-kit';
import { env } from './src/env';

export default {
  dialect: 'postgresql',
  schema: './src/schema.ts',
  out: './src/migrations',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
