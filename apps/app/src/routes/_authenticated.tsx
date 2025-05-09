// import { authClient } from '@acme/auth/client';
import {
  createFileRoute,
  //redirect
} from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    // const auth = await authClient.getSession();
    // if (!auth.data) {
    //   throw redirect({
    //     to: '/login',
    //     search: {
    //       // Use the current location to power a redirect after login
    //       // (Do not use `router.state.resolvedLocation` as it can
    //       // potentially lag behind the actual current location)
    //       redirect: location.href,
    //     },
    //   });
    // }
  },
});
