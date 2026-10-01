import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_CANONICAL_URL: z.union([z.literal('/'), z.string()]),
});
