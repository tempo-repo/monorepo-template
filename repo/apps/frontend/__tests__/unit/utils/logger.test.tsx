import c from 'ansi-colors';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { injectMocks } from 'xenopomp-essentials/vitest';

import { DevLogger, LONGEST_PREFIX_LENGTH } from '@scripts/impl';

describe('Logger methods', () => {
  const spyLog = vi.spyOn(console, 'log');
  const spyError = vi.spyOn(console, 'error');
  const spyWarn = vi.spyOn(console, 'warn');
  const spyInfo = vi.spyOn(console, 'info');

  // Mock system time
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubEnv('TZ', 'UTC');
    const mockDate = new Date('2026-06-17T12:12:12Z');
    vi.setSystemTime(mockDate);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  // This will clear all mocks after tests
  injectMocks(() => {});

  const TIME = c.gray(`[12:12:12]`);

  test('.start(_)', () => {
    DevLogger.start('START 12');
    expect(spyLog).toHaveBeenCalledWith(`${c.green('START')} ${TIME} START 12`);
  });

  test('.end(_)', () => {
    DevLogger.end('This is an end');
    expect(spyLog).toHaveBeenCalledWith(
      `${c.green('  END')} ${TIME} This is an end`,
    );
  });

  test('.log(_)', () => {
    DevLogger.log('Hello, Gleb!');
    expect(spyLog).toHaveBeenCalledWith(
      `${c.white('  LOG')} ${TIME} Hello, Gleb!`,
    );
  });

  test('.error(_)', () => {
    DevLogger.error('Bombastic');
    expect(spyError).toHaveBeenCalledWith(
      `${c.red('ERROR')} ${TIME} Bombastic`,
    );
  });

  test('.warn(_)', () => {
    DevLogger.warn('Hello, warning!');
    expect(spyWarn).toHaveBeenCalledWith(
      `${c.yellow(' WARN')} ${TIME} Hello, warning!`,
    );
  });

  test('.info(_)', () => {
    DevLogger.info('Gleb does not exist');
    expect(spyInfo).toHaveBeenCalledWith(
      `${c.cyanBright(' INFO')} ${TIME} Gleb does not exist`,
    );
  });

  test('.debug(_)', () => {
    DevLogger.debug('Bug');
    expect(spyLog).toHaveBeenCalledWith(
      `${c.magenta.bold('DEBUG')} ${TIME} Bug`,
    );
  });
});

describe('Logger prefixes', () => {
  test('Max length is calculated correctly', () => {
    expect(LONGEST_PREFIX_LENGTH).toEqual(5);
  });
});
