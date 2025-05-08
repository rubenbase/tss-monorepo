import { TRPCRouterRecord } from '@trpc/server';
import { publicProcedure } from '../trpc';

export const authRouter = {
  getSecretMessage: publicProcedure.query(() => 'you can see this secret'),
} satisfies TRPCRouterRecord;
