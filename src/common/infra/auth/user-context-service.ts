import { requestContext } from '@fastify/request-context';

import { APP_TOKENS } from '../../../configs/constants';
import { IJwtAccessTokenPayloadDto, IJwtRefreshTokenPayloadDto } from '../../../modules/auth/auth-interfaces';
import { IUserContext } from '../../interfaces/user-context-interface';

/**
 *  Fastify wrapper on AsyncLocalStorage
 */
export class UserContextService {
  public get(): IUserContext {
    return requestContext.get(APP_TOKENS.userCredentials);
  }

  public set(value: IJwtAccessTokenPayloadDto | IJwtRefreshTokenPayloadDto | any) {
    requestContext.set(APP_TOKENS.userCredentials, value);
  }
}
