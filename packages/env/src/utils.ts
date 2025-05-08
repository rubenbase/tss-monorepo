import { z } from 'zod';

export const nodeEnv = z
  .string()
  .optional()
  .default('development')
  .pipe(z.enum(['development', 'production', 'test']));

export function zStringDefaultInDev(defaultValue: string) {
  const isDev =
    process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === 'local' ||
    process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === 'ci' ||
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test';

  if (!isDev) return z.string();
  return z.string().optional().default(defaultValue);
}

export const zStringRequiredInProduction = z
  .string()
  .optional()
  .refine(
    (token) => {
      if (
        process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === 'local' ||
        process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === 'ci' ||
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
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
        process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === 'local' ||
        process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === 'ci' ||
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
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
