import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { defineConfig } from '@tanstack/react-start/config';
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { cloudflare } from 'unenv';
import nitroCloudflareBindings from 'nitro-cloudflare-dev';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  tsr: {
    appDirectory: './src',
  },
  server: {
    preset: 'cloudflare-module',
    unenv: cloudflare,
    modules: [nitroCloudflareBindings],
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: [
        // TODO: This should be done automatically
        {
          find: '@acme/ui',
          replacement: path.resolve(__dirname, '../../packages/ui/src'),
        },
      ],
    },
  },
});
