import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { IBaseController } from '../../common/interfaces/base-controller-interface';

import { UsersService } from './users-service';
import { IUsersDto } from './users-interfaces';
import { usersSchema } from './users-schemas';
import { UserContextService } from '../../common/infra/auth/user-context-service';
import { ILoggerService } from '../../common/interfaces/logger-service-interface';

export class UsersController implements IBaseController {
  public routerPrefix = '/users';

  public constructor(
    private readonly _usersService: UsersService,
    private readonly _userContext: UserContextService,
    private readonly _logger: ILoggerService,
  ) {}

  public initRouter(app: FastifyInstance, opts: FastifyPluginOptions): void {
    app.get('/info', {
      handler: this._info,
      schema: usersSchema.info,
      preValidation: [app.verifyJwtAccessToken],
    });

    app.get('/latency', {
      handler: this._latency,
      schema: usersSchema.latency,
      preValidation: [app.verifyJwtAccessToken],
    });
  }

  private _info = (): Promise<IUsersDto> => {
    const userId = this._userContext.get().id;
    this._logger.debug('userId' + userId);
    return this._usersService.getById(userId);
  };

  private _latency = async (): Promise<{ result: string }> => {
    const result = await this._usersService.latency();
    return { result };
  };
}
