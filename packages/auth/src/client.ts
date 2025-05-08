import { createAuthClient } from 'better-auth/react';

import { sharedEnvs } from '@acme/env/shared';

export const authClient = createAuthClient({
  baseURL: sharedEnvs.VITE_PUBLIC_URL,
});
