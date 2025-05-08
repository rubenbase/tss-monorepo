import { createEnv } from '@t3-oss/env-core';
import { nodeEnv, zStringDefaultInDev } from './utils';

export const sharedClientEnvs = {
  VITE_PUBLIC_URL: zStringDefaultInDev('http://localhost:3000'),
} as const;

const runtimeEnv = {
  ...process.env,
  ...(import.meta.env ?? {}),
} as const;

export const sharedEnvs = createEnv({
  server: {
    /* Environment */
    NODE_ENV: nodeEnv,
  },
  clientPrefix: 'VITE_',
  client: sharedClientEnvs,
  runtimeEnv,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
