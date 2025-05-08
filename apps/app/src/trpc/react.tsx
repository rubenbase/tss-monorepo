import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { AppRouter } from '@acme/api';

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();
