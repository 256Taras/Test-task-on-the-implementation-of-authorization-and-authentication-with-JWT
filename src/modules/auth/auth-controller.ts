import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
} from 'fastify';

import { convertToObjectOrEmptyObject } from '../../common/utils/common';
import { ISuccess } from '../../common/interfaces/responce-interface';
import { IBaseController } from '../../common/interfaces/base-controller-interface';

import {
  IJwtTokensDto,
  IQueryParamsLogout,
  ISignInDto,
  ISignUpBodyDto,
  ISignUpDto,
} from './auth-interfaces';
import { AuthService } from './auth-service';
import { authSchemas } from './auth-schemas';
import { UserRefreshTokensService } from '../users/user-refresh-tokens-service';

export class AuthController implements IBaseController {
  public routerPrefix = '/auth';

  public constructor(
    private readonly _authService: AuthService,
    private readonly _userRefreshTokensService: UserRefreshTokensService,
  ) {}

  public initRouter(
    app: FastifyInstance,
    opts: FastifyPluginOptions,
  ): void {
    app.post('/signup', {
      handler: this._signup,
      schema: authSchemas.signup,
    });
    app.post('/signin', {
      handler: this._signin,
      schema: authSchemas.signin,
    });
    app.get('/logout', {
      handler: this._logout,
      schema: authSchemas.logout,
      preValidation: [app.verifyJwtRefreshToken],
    });
    app.get('/refresh', {
      handler: this._refreshTokens,
      schema: authSchemas.refresh,
      preValidation: [app.verifyJwtRefreshToken],
    });
  }

  private _signup = (
    req: FastifyRequest<{ Body: ISignUpBodyDto }>,
  ): Promise<IJwtTokensDto> => {
    return this._authService.createUser(
      convertToObjectOrEmptyObject<ISignUpDto>({
        idType: req.body.id,
        password: req.body.password,
      }),
    );
  };

  private _signin = (
    req: FastifyRequest<{ Body: ISignInDto }>,
  ): Promise<IJwtTokensDto> => {
    return this._authService.singInUser(
      convertToObjectOrEmptyObject(req.body),
    );
  };

  private _logout = (
    req: FastifyRequest<{ Querystring: IQueryParamsLogout }>,
  ): Promise<ISuccess> => {
    const user = req.context?.user;
    return this._userRefreshTokensService.deleteOneOrAll(
      user.refreshTokenId,
      req.query?.all ? user.id : null,
    );
  };

  private _refreshTokens = (
    req: FastifyRequest,
  ): Promise<{ token: string }> => {
    const user = req.context?.user;
    return this._authService.refreshTokens({
      refreshTokenId: user.refreshTokenId,
      id: user.refreshTokenId,
    });
  };
}
