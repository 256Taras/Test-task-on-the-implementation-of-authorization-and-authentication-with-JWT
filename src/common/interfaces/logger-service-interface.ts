import { LogLevel } from 'fastify/types/logger';

export interface ILoggerService {
  /**
   * Write an 'info' level log.
   */
  info(message: string | Record<any, any> | any[], trace?: string, context?: string): void;

  /**
   * Write an 'error' level log.
   */
  error(message: string | Record<any, any> | any[], trace: string, context: any): void;

  /**
   * Write a 'warn' level log.
   */
  warn(message: string | Record<any, any> | any[]): void;

  /**
   * Write a 'debug' level log.
   */
  debug(message: string | Record<any, any> | any[]): void;

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: string | Record<any, any> | any[]): void;

  /**
   * Set log levels.
   * @param levels log levels
   */
  setLogLevels?(levels: LogLevel[]): void;
}
