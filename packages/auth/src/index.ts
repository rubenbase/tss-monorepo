import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { db } from '@acme/db/client';
import { user, session, account, verification } from '@acme/db/schema';

import { authEnvs } from '@acme/env/auth';

export const auth = betterAuth({
  secret: authEnvs.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: false,
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: authEnvs.GOOGLE_CLIENT_ID,
      clientSecret: authEnvs.GOOGLE_CLIENT_SECRET,
    },
  },
});
