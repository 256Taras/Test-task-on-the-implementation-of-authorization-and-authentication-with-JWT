import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
} from 'fastify';

import { IBaseController } from '../../common/interfaces/base-controller-interface';
import { UsersService } from './users-service';
import { IUsersDto } from './users-interfaces';
import { usersSchema } from './users-schemas';

export class UsersController implements IBaseController {
  public routerPrefix = '/users';

  public constructor(private readonly _usersService: UsersService) {}

  public initRouter(
    app: FastifyInstance,
    opts: FastifyPluginOptions,
  ): void {
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

  private _info = (req: FastifyRequest): Promise<IUsersDto> => {
    return this._usersService.getById(req.context.user.id);
  };

  private _latency = async (): Promise<{ result: string }> => {
    const result = await this._usersService.latency();
    return { result };
  };
}
