import c from 'ansi-colors';

import type { MethodType } from './logger.data';
import { LONGEST_PREFIX_LENGTH, PREFIXES } from './logger.data';

/**
 * The purpose of this logger is to write messages
 * when running dev scripts.
 */
export class DevLogger {
  /** Send [START] message. */
  static start = this.printMessage('start');

  /** Send [END] message. */
  static end = this.printMessage('end');

  /** Send [LOG] message. */
  static log = this.printMessage('log');

  /** Send [WRN] message. */
  static warn = this.printMessage('warn');

  /** Send [ERR] message. */
  static error = this.printMessage('error');

  /** Send [INF] message. */
  static info = this.printMessage('info');

  /** Send [DEBUG] message. */
  static debug = this.printMessage('debug');

  private static printMessage(method: MethodType): (message?: string) => void {
    return function (message) {
      const { raw, color, consoleMethod } = PREFIXES[method];
      const prefix: string = color(raw.padStart(LONGEST_PREFIX_LENGTH, ' '));
      const printingMessage: string = [prefix, DevLogger.getTime(), message]
        .filter(s => s !== undefined)
        .join(' ');
      console[consoleMethod](printingMessage);
    };
  }

  private static getTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return c.grey(`[${this.f(hours)}:${this.f(minutes)}:${this.f(seconds)}]`);
  }

  private static f(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
