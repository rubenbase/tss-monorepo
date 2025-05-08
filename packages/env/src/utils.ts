import { z } from 'zod';

const envs: Record<string, string> = {
  ...process.env,
  ...(import.meta.env ?? {}),
};

export const nodeEnv = z
  .string()
  .optional()
  .default('development')
  .pipe(z.enum(['development', 'production', 'test']));

export function zStringDefaultInDev(defaultValue: string) {
  const isDev =
    envs.NEXT_PUBLIC_DEPLOYMENT_ENV === 'local' ||
    envs.NEXT_PUBLIC_DEPLOYMENT_ENV === 'ci' ||
    envs.NODE_ENV === 'development' ||
    envs.NODE_ENV === 'test';

  if (!isDev) return z.string();
  return z.string().optional().default(defaultValue);
}

export const zStringRequiredInProduction = z
  .string()
  .optional()
  .refine(
    (token) => {
      if (
        envs.NEXT_PUBLIC_DEPLOYMENT_ENV === 'local' ||
        envs.NEXT_PUBLIC_DEPLOYMENT_ENV === 'ci' ||
        envs.NODE_ENV === 'development' ||
        envs.NODE_ENV === 'test'
      ) {
        return true;
      }
      return token ? token.length > 0 : false;
    },
    { message: 'Required in production' }
  );

export const zNumberRequiredInProduction = z
  .string()
  .optional()
  .refine(
    (token) => {
      if (
        envs.NEXT_PUBLIC_DEPLOYMENT_ENV === 'local' ||
        envs.NEXT_PUBLIC_DEPLOYMENT_ENV === 'ci' ||
        envs.NODE_ENV === 'development' ||
        envs.NODE_ENV === 'test'
      ) {
        return true;
      }
      return token ? token.length > 0 : false;
    },
    { message: 'Required in production' }
  )
  .transform((s) => {
    if (s) {
      return parseInt(s, 10);
    }
    return undefined;
  })
  .pipe(z.number().optional());
