import { token } from 'brandi';
import { AsyncLocalStorage } from 'async_hooks';
import { FastifyBaseLogger } from 'fastify/types/logger';

import { UserContextService } from './infra/auth/user-context-service';
import { ILoggerService } from './interfaces/logger-service-interface';

export const COMMON_TOKENS = {
  asyncLocalStorage: token<AsyncLocalStorage<Map<string, any>>>('asyncLocalStorage'),
  userContextService: token<UserContextService>('userContextService'),
  loggerService: token<ILoggerService>('loggerService'),
  fastifyBaseLogger: token<FastifyBaseLogger>('fastifyBaseLogger'),
};
