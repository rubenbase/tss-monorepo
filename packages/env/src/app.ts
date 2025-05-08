import { createEnv } from '@t3-oss/env-core';

import { sharedClientEnvs, sharedEnvs } from './shared';
import {
  zNumberRequiredInProduction,
  zStringRequiredInProduction,
} from './utils';

export const appEnvs = createEnv({
  extends: [sharedEnvs],
  server: {
    /* Analytics */
    POSTHOG_PROJECT_ID: zNumberRequiredInProduction,
    POSTHOG_PERSONAL_API_KEY: zStringRequiredInProduction,
    AXIOM_API_KEY: zStringRequiredInProduction,

    /* Payments */
    STRIPE_PRO_PLAN_PRICE_ID: zStringRequiredInProduction,
    STRIPE_ENTERPRISE_PLAN_PRICE_ID: zStringRequiredInProduction,
    STRIPE_SECRET_KEY: zStringRequiredInProduction,
    STRIPE_WEBHOOK_SECRET: zStringRequiredInProduction,
    STRIPE_CHECKOUT_URL: zStringRequiredInProduction,
  },
  runtimeEnv: process.env,
  clientPrefix: 'VITE_',
  client: {
    ...sharedClientEnvs,
  },
});
