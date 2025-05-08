import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const DATABASE = {
  DATABASE_URL: z.string().min(1),
} as const;

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).optional(),
    ...DATABASE,
  },
  clientPrefix: 'VITE_',
  client: {},
  runtimeEnv: process.env,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
