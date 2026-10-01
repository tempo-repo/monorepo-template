import c, { cyanBright, green, red, white, yellow } from 'ansi-colors';
import { pipe } from 'xenopomp-essentials';

export const PREFIXES = {
  start: {
    raw: 'START',
    color: green,
    consoleMethod: 'log',
  },
  end: {
    raw: 'END',
    color: green,
    consoleMethod: 'log',
  },
  log: {
    raw: 'LOG',
    color: white,
    consoleMethod: 'log',
  },
  error: {
    raw: 'ERROR',
    color: red,
    consoleMethod: 'error',
  },
  warn: {
    raw: 'WARN',
    color: yellow,
    consoleMethod: 'warn',
  },
  info: {
    raw: 'INFO',
    color: cyanBright,
    consoleMethod: 'info',
  },
  debug: {
    raw: 'DEBUG',
    color: c.magenta.bold,
    consoleMethod: 'log',
  },
} as const satisfies Record<
  string,
  { raw: string; color: (s: string) => string; consoleMethod: ConsoleMethod }
>;

export const LONGEST_PREFIX_LENGTH: number = pipe(() =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(PREFIXES).map(([_, e]) => e.raw.length),
).pipe(e => Math.max(...e))(undefined);

type ConsoleMethod = keyof typeof console;
export type MethodType = keyof typeof PREFIXES;
