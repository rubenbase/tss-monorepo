import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const AUTH = {
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  BETTER_AUTH_SECRET:
    process.env.NODE_ENV === 'production'
      ? z.string().min(1)
      : z.string().min(1).optional(),
} as const;

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).optional(),
    ...AUTH,
  },
  clientPrefix: 'VITE_',
  client: {},
  runtimeEnv: process.env,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
