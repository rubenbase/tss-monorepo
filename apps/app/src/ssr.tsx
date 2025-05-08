/// <reference types="vinxi/types/server" />
import { getRouterManifest } from '@tanstack/react-start/router-manifest';
import {
  createStartHandler,
  defaultStreamHandler,
  getHeaders,
} from '@tanstack/react-start/server';
import { createRouter } from './router';

export default createStartHandler({
  createRouter: () => {
    const headers = getHeaders();
    return createRouter(headers);
  },
  getRouterManifest,
})(defaultStreamHandler);
