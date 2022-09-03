import { AsyncLocalStorage } from 'node:async_hooks';
import { FastifyBaseLogger } from 'fastify/types/logger';

import { APP_TOKENS } from '../../../configs/constants';
import { ILoggerService } from '../../interfaces/logger-service-interface';

export class Logger implements ILoggerService {
  readonly #als!: AsyncLocalStorage<any>;

  get #logger(): FastifyBaseLogger {
    return this.#als.getStore()?.get(APP_TOKENS.logger);
  }

  public constructor(als: AsyncLocalStorage<Map<string, any>>) {
    this.#als = als;
  }

  public debug = (message: string | Record<any, any> | any[]): void => {
    if (typeof message === 'object') {
      this.#logger.debug(JSON.stringify(message, null, '\t'));
      return;
    }
    this.#logger.debug(message);
  };

  public error = (message: string | Record<any, any> | any[], trace: string, context: any): void => {
    this.#logger.error({
      err: {
        message,
        stack: trace,
        context,
      },
    });
  };

  public info = (message: string | Record<any, any> | any[], trace?: string, context?: string): void => {
    this.#logger.info(message);
  };

  public verbose = (message: string | Record<any, any> | any[]): void => {
    this.#logger.trace(message);
  };

  public warn = (message: string | Record<any, any> | any[]): void => {
    this.#logger.warn(message);
  };

  public fatal = (message: string | Record<any, any> | any[]): void => {
    this.#logger.fatal(message);
  };
}
