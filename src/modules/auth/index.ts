import { injected } from 'brandi';

import { container } from '../../common/infra/container';
import { TOKENS } from '../../types';

import { AuthService } from './auth-service';
import { AuthController } from './auth-controller';
import { UserRefreshTokensService } from '../users-refresh-tokens/user-refresh-tokens-service';
import { UsersService } from '../users/users-service';

injected(UsersService, TOKENS.userRepository);
injected(AuthService, TOKENS.userService, TOKENS.hashService, TOKENS.userRefreshTokenService);
injected(UserRefreshTokensService, TOKENS.userRefreshTokenRepository, TOKENS.hashService);
injected(AuthController, TOKENS.autService, TOKENS.userRefreshTokenService, TOKENS.userContextService, TOKENS.loggerService);

export const authModule = container.get(TOKENS.authController);
