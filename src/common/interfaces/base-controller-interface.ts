import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export interface IBaseController {
  readonly routerPrefix: string;
  initRouter: (
    app: FastifyInstance,
    opts: FastifyPluginOptions,
  ) => void;
}
