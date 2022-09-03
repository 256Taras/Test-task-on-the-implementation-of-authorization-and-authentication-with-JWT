import { PinoLoggerOptions } from 'fastify/types/logger';

export const loggerConfig: PinoLoggerOptions = {
  enabled: process.env.IS_REQUEST_LOGGING_ENABLED === '1',
  level: process.env.LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      ignore: 'serviceContext',
      translateTime: 'SYS:HH:MM:ss.l',
    },
  },
};
