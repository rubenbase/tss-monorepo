import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { TRPCError, TRPCRouterRecord } from '@trpc/server';

type Post = {
  id: string;
  title: string;
  body: string;
};

const posts: Post[] = [
  {
    id: '1',
    title: 'Post 1',
    body: 'Body 1',
  },
  {
    id: '2',
    title: 'Post 2',
    body: 'Body 2',
  },
];

export const postRouter = {
  list: publicProcedure.query(async () => {
    return posts;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      console.log('>>> input', input);
      const post = posts.find((p) => p.id === input.id);
      console.log('>>> post', post);
      if (!post) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return post;
    }),
} satisfies TRPCRouterRecord;
