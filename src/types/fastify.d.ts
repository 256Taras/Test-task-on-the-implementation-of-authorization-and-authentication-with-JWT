import {
  FastifyReply,
  DoneFuncWithErrOrRes,
  FastifyRequest,
} from 'fastify';

import {
  type FastifyJwtVerifyOptions,
  type VerifyOptions,
} from '@fastify/jwt';

import {
  IJwtAccessTokenPayloadDto,
  IJwtRefreshTokenPayloadDto,
} from '../modules/auth/auth-interfaces';

interface IJwtHandlers {
  verifyJwtRefreshToken: () => void;
  verifyJwtAccessToken: () => void;
}

declare module 'fastify' {
  interface FastifyInstance extends IJwtHandlers {
    verifyJwt: (
      req: FastifyRequest,
      res: FastifyReply,
      done: DoneFuncWithErrOrRes,
    ) => void;
  }

  interface FastifyRequest extends IJwtHandlers {
    accessJwtVerify<Decoded extends VerifyPayload>(
      options?: FastifyJwtVerifyOptions,
    ): Promise<Decoded>;
    accessJwtVerify<Decoded extends VerifyPayload>(
      options?: Partial<VerifyOptions>,
    ): Promise<Decoded>;
    refreshJwtVerify<Decoded extends VerifyPayload>(
      options?: FastifyJwtVerifyOptions,
    ): Promise<Decoded>;
    refreshJwtVerify<Decoded extends VerifyPayload>(
      options?: Partial<VerifyOptions>,
    ): Promise<Decoded>;
  }
  // ts-ignore
  interface FastifyContext {
    user: IJwtRefreshTokenPayloadDto | IJwtAccessTokenPayloadDto;
  }
}
