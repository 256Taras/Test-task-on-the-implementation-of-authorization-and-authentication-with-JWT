import { FastifyRequest } from 'fastify';

import {
  BadCredentialsException,
  ForbiddenException,
} from '../../errors/common';

import {
  IJwtAccessTokenPayloadDto,
  IJwtRefreshTokenPayloadDto,
} from '../../../modules/auth/auth-interfaces';

export class AuthenticatorService {
  static #instance: AuthenticatorService;

  static get getInstance(): AuthenticatorService {
    if (!this.#instance) this.#instance = new AuthenticatorService();

    return this.#instance;
  }

  private _extractToken = (str: string): string | null => {
    if (
      str &&
      typeof str === 'string' &&
      str.split(' ')[0] === 'Bearer'
    ) {
      return str.split(' ')[1];
    }
    return null;
  };

  public verifyJwtAccessToken = async (
    req: FastifyRequest,
  ): Promise<void> => {
    const { authorization }: any = req.headers;
    const token = this._extractToken(authorization);
    if (!token) {
      throw new ForbiddenException('Token is missing');
    }

    try {
      const user: IJwtAccessTokenPayloadDto =
        await req.accessJwtVerify();
      req.context = { ...(req.context || {}), user };
    } catch (e: any) {
      throw new BadCredentialsException(
        'Authorization token expired',
      );
    }
  };

  public extractRefreshToken = (
    req: FastifyRequest<{ Headers: { ['x-refresh-token']: string } }>,
  ): string | null => {
    const refreshToken = req.headers['x-refresh-token'];
    if (Array.isArray(refreshToken) || refreshToken === undefined)
      return null;
    return this._extractToken(refreshToken);
  };

  public verifyJwtRefreshToken = async (
    req: FastifyRequest<{ Headers: { ['x-refresh-token']: string } }>,
  ): Promise<void> => {
    try {
      const user: IJwtRefreshTokenPayloadDto =
        await req.refreshJwtVerify();
      req.context = { ...(req.context || {}), user };
    } catch (e: any) {
      throw new BadCredentialsException(
        'Authorization token expired',
      );
    }
  };
}
