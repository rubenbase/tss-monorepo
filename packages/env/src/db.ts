import { createEnv } from '@t3-oss/env-core';
import { zStringDefaultInDev } from './utils';
import { z } from 'zod';

export const dbEnvs = createEnv({
  server: {
    /* Database */
    DATABASE_URL: zStringDefaultInDev(
      'postgresql://neondb_owner:npg_tydI8wCPSNU2@ep-shiny-boat-a4s03xk2-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
    ),
    DATABASE_URL_REPLICA: z.string().optional(),
  },
  clientPrefix: 'VITE_',
  client: {},
  runtimeEnv: process.env,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
