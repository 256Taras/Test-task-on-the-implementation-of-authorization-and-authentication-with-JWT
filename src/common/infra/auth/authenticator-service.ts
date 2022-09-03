import { FastifyRequest } from 'fastify';

import { BadCredentialsException, ForbiddenException } from '../../errors/common';
import { UserContextService } from './user-context-service';

import { IJwtAccessTokenPayloadDto, IJwtRefreshTokenPayloadDto } from '../../../modules/auth/auth-interfaces';

export class AuthenticatorService {
  static #instance: AuthenticatorService;

  static get getInstance(): AuthenticatorService {
    if (!this.#instance) this.#instance = new AuthenticatorService();

    return this.#instance;
  }

  private _extractToken = (str: string | unknown): string | null => {
    if (str && typeof str === 'string' && str.split(' ')[0] === 'Bearer') {
      return str.split(' ')[1];
    }
    return null;
  };

  public verifyJwtAccessToken = async (req: FastifyRequest): Promise<void> => {
    const { authorization }: any = req.headers;
    const token = this._extractToken(authorization);
    if (!token) {
      throw new ForbiddenException('Token is missing');
    }
    try {
      const user: IJwtAccessTokenPayloadDto = await req.accessJwtVerify();
      new UserContextService().set(user);
    } catch (e: any) {
      throw new BadCredentialsException(e.message);
    }
  };

  public extractRefreshToken = (req: FastifyRequest<{ Headers: { ['x-refresh-token']: string } }>): string | null => {
    const refreshToken = req.headers['x-refresh-token'];
    if (Array.isArray(refreshToken) || refreshToken === undefined) return null;
    return this._extractToken(refreshToken);
  };

  public verifyJwtRefreshToken = async (
    req: FastifyRequest<{ Headers: { ['x-refresh-token']: string } }>,
  ): Promise<void> => {
    try {
      const user: IJwtRefreshTokenPayloadDto = await req.refreshJwtVerify();
      new UserContextService().set(user);
    } catch (e: any) {
      throw new BadCredentialsException(e.message);
    }
  };
}
