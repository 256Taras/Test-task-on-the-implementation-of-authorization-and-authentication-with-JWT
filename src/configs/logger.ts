export const loggerConfig = {
  enabled: process.env.IS_REQUEST_LOGGING_ENABLED === '1',
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
