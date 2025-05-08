import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const authEnvs = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string(),
    /* Google */
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  },
  clientPrefix: 'VITE_',
  client: {},
  runtimeEnv: process.env,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
