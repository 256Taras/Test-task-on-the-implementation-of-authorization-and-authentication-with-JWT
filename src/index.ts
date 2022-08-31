import 'dotenv/config';
import { fastify } from 'fastify';
import pino from 'pino';
import fastifyCors from '@fastify/cors';
import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt';

import { fastifyConfig } from './configs/fastify';
import { loggerConfig } from './configs/logger';
import { jwtConfig } from './configs/jwt';

import { AuthenticatorService } from './common/infra/auth/authenticator-service';
import { app as appV1Plugin } from './common/api/rest-api/v1/app';

class RestServer {
  private readonly _fastify = fastify({
    ...fastifyConfig,
    logger: pino(loggerConfig),
  });

  async start(): Promise<void> {
    try {
      void this._fastify.register(fastifyCors, {
        origin: '*',
        methods: 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
        allowedHeaders:
          'Origin, Content-Type, X-Requested-With, Authorization, Accept, append, delete, entries, foreach, get, has, keys, set, values, *',
        preflightContinue: true,
        optionsSuccessStatus: 204,
      });
      this._fastify.log.info(jwtConfig);
      void this._fastify.register(fastifyJwt, {
        secret: jwtConfig.accessTokenSecret,
        namespace: 'access',
        // jwtVerify: 'verifyJwtAccessToken'
      });
      void this._fastify.register(fastifyJwt, {
        secret: jwtConfig.refreshTokenSecret,
        // jwtVerify: 'verifyJwtRefreshToken',

        namespace: 'refresh',
        verify: {
          extractToken:
            AuthenticatorService.getInstance.extractRefreshToken,
        },
      } as FastifyJWTOptions);

      void this._fastify.decorate(
        'verifyJwtAccessToken',
        AuthenticatorService.getInstance.verifyJwtAccessToken,
      );
      void this._fastify.decorate(
        'verifyJwtRefreshToken',
        AuthenticatorService.getInstance.verifyJwtRefreshToken,
      );

      void this._fastify.register(appV1Plugin, { prefix: 'v1/' });

      void this._fastify.listen(
        { port: 8000, host: '0.0.0.0' },
        (err, address) => {
          if (err) {
            this._fastify.log.error(err);
            process.exit(1);
          }
        },
      );
    } catch (err) {
      console.log(err);
      this._fastify.log.error(err);
      process.exit(1);
    }
  }
}

const app = new RestServer();
void app.start();
