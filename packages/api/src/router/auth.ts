import { TRPCRouterRecord } from '@trpc/server';
import { protectedProcedure } from '../trpc';

export const authRouter = {
  getSecretMessage: protectedProcedure.query(() => 'you can see this secret'),
} satisfies TRPCRouterRecord;
