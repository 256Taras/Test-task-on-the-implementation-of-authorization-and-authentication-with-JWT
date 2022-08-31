import { FastifyInstance } from 'fastify';

import { AuthModule } from '../../../../modules/auth';
import { UsersModule } from '../../../../modules/users';

export const app = (fastify: FastifyInstance): PromiseLike<void> => {
  return fastify.after().then(() => {
    void fastify.register(
      async (inst, opts, done) => AuthModule.initRouter(inst, opts),
      {
        prefix: AuthModule.routerPrefix,
      },
    );

    void fastify.register(
      async (inst, opts, done) => UsersModule.initRouter(inst, opts),
      {
        prefix: UsersModule.routerPrefix,
      },
    );
  });
};
