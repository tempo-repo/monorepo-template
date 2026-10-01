import { envSchema } from './schema';

const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_CANONICAL_URL:
    process.env.NEXT_PUBLIC_CANONICAL_URL ??
    (process.env.NODE_ENV === 'production' ? '/' : undefined),
});

export default env;
export { envSchema };
