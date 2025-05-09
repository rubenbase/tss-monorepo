/// <reference types="vinxi/types/server" />

import { getRouterManifest } from '@tanstack/react-start/router-manifest';
import {
  createStartHandler,
  defaultStreamHandler,
  getWebRequest,
} from '@tanstack/react-start/server';
import { createRouter } from './router';

export default createStartHandler({
  createRouter: () => {
    const request = getWebRequest()!;
    const headers = new Headers(request.headers);
    return createRouter(headers);
  },
  getRouterManifest,
})(defaultStreamHandler);
