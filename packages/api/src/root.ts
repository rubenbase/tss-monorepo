import { createTRPCRouter } from './trpc';
import { userRouter } from './router/user';
import { postRouter } from './router/post';

export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
