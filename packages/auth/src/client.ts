import { createAuthClient } from 'better-auth/react';
import { env } from './env';

export const authClient = createAuthClient({
  baseURL:
    env.NODE_ENV === 'production'
      ? 'https://hub.gobrand.app'
      : 'http://localhost:3000',
});
