import { createAPIFileRoute } from '@tanstack/react-start/api';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, createTRPCContext } from '@acme/api';

function handler({ request }: { request: Request }) {
  return fetchRequestHandler({
    req: request,
    router: appRouter,
    endpoint: '/api/trpc',
    createContext: () =>
      createTRPCContext({
        session: null,
        headers: request.headers,
      }),
    onError(opts) {
      // if (process.env.NODE_ENV === 'development') {
      const { path, error } = opts;
      console.error(
        `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
      );
      return error;
      // } else {
      // const { error } = opts;
      // if (error.code === 'INTERNAL_SERVER_ERROR') {
      // Sentry.captureException(error); // Uncomment if Sentry is set up
      // }
      // return error;
      // }
    },
  });
}

export const APIRoute = createAPIFileRoute('/api/trpc/$')({
  GET: handler,
  POST: handler,
});
