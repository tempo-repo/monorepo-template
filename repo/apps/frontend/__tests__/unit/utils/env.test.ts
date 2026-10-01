import { afterEach, describe, expect, test, vi } from 'vitest';

import env, { envSchema } from '@/env';

describe('Zod env schema', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test('It parses NODE_ENV', () => {
    expect(env.NODE_ENV).toBe('test');
  });

  test('It parses NEXT_PUBLIC_CANONICAL_URL', () => {
    expect(env.NEXT_PUBLIC_CANONICAL_URL).toBe('http://localhost:4444');
  });

  test('NEXT_PUBLIC_CANONICAL_URL is parsed properly', () => {
    vi.stubEnv('NODE_ENV', 'test');

    const parse = (url: string | undefined) => {
      vi.stubEnv('NEXT_PUBLIC_CANONICAL_URL', url);
      envSchema.parse({
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_CANONICAL_URL: process.env.NEXT_PUBLIC_CANONICAL_URL,
      });
    };

    // Wrong url passed. Must throw
    expect(() => parse('not-an-url')).toThrow();
    expect(() => parse(undefined)).toThrow();
    expect(() => parse('http://localhost:8888')).not.toThrow();
  });
});
