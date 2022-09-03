import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify';

import { convertToObjectOrEmptyObject } from '../../common/utils/common';
import { ISuccess } from '../../common/interfaces/responce-interface';
import { IBaseController } from '../../common/interfaces/base-controller-interface';
import { UserContextService } from '../../common/infra/auth/user-context-service';
import { ILoggerService } from '../../common/interfaces/logger-service-interface';

import { UserRefreshTokensService } from '../users-refresh-tokens/user-refresh-tokens-service';
import { IJwtTokensDto, IQueryParamsLogout, ISignInDto, ISignUpBodyDto, ISignUpDto } from './auth-interfaces';
import { AuthService } from './auth-service';
import { authSchemas } from './auth-schemas';

export class AuthController implements IBaseController {
  public routerPrefix = '/auth';

  public constructor(
    private readonly _authService: AuthService,
    private readonly _userRefreshTokensService: UserRefreshTokensService,
    private readonly _userContext: UserContextService,
    private readonly _logger: ILoggerService,
  ) {}

  public initRouter(app: FastifyInstance, opts: FastifyPluginOptions): void {
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

  private _signup = ({ body }: FastifyRequest<{ Body: ISignUpBodyDto }>): Promise<IJwtTokensDto> => {
    this._logger.debug('_signup start!');
    this._logger.debug(body);
    return this._authService.createUser(
      convertToObjectOrEmptyObject<ISignUpDto>({
        idType: body.id,
        password: body.password,
      }),
    );
  };

  private _signin = ({ body }: FastifyRequest<{ Body: ISignInDto }>): Promise<IJwtTokensDto> => {
    this._logger.debug('_signin start!');
    return this._authService.singInUser(convertToObjectOrEmptyObject(body));
  };

  private _logout = (req: FastifyRequest<{ Querystring: IQueryParamsLogout }>): Promise<ISuccess> => {
    this._logger.debug('_logout start!');
    const user = this._userContext.get();
    this._logger.debug(user);
    return this._userRefreshTokensService.deleteOneOrAll(user.refreshTokenId, req.query?.all ? user.id : null);
  };

  private _refreshTokens = (): Promise<{ token: string }> => {
    this._logger.debug('_refreshTokens start!');
    const user = this._userContext.get();
    this._logger.debug(user);
    return this._authService.refreshTokens({
      refreshTokenId: user.refreshTokenId,
      id: user.id,
    });
  };
}
