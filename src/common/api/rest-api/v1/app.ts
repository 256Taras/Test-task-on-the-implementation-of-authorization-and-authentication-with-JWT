import { FastifyInstance } from 'fastify';

import { authModule } from '../../../../modules/auth';
import { userModule } from '../../../../modules/users';

export const app = (fastify: FastifyInstance): PromiseLike<void> => {
  return fastify.after().then(() => {
    void fastify.register(async (inst, opts) => authModule.initRouter(inst, opts), {
      prefix: authModule.routerPrefix,
    });

    void fastify.register(async (inst, opts) => userModule.initRouter(inst, opts), {
      prefix: userModule.routerPrefix,
    });
  });
};
