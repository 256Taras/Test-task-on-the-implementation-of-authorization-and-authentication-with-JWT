import { Container, injected } from 'brandi';
import { AsyncLocalStorage } from 'async_hooks';

import { TOKENS } from '../../../types';
import { Logger } from '../logger';
import { UserContextService } from '../auth/user-context-service';
import { UsersController } from '../../../modules/users/users-controller';
import { UsersService } from '../../../modules/users/users-service';
import { UsersRepository } from '../../../modules/users/users-repository';
import { AuthController } from '../../../modules/auth/auth-controller';
import { HashService } from '../../../modules/auth/hash-service';
import { AuthService } from '../../../modules/auth/auth-service';
import { UserRefreshTokensRepository } from '../../../modules/users-refresh-tokens/user-refresh-tokens-repository';
import { UserRefreshTokensService } from '../../../modules/users-refresh-tokens/user-refresh-tokens-service';

const container = new Container();
/**
 * Common
 */
container.bind(TOKENS.asyncLocalStorage).toInstance(AsyncLocalStorage).inSingletonScope();
container.bind(TOKENS.loggerService).toInstance(Logger).inSingletonScope();
container.bind(TOKENS.userContextService).toInstance(UserContextService).inSingletonScope();
/**
 * Users
 */
container.bind(TOKENS.userController).toInstance(UsersController).inSingletonScope();
container.bind(TOKENS.userService).toInstance(UsersService).inSingletonScope();
container.bind(TOKENS.userRepository).toInstance(UsersRepository).inSingletonScope();

/**
 * User Refresh
 */
container.bind(TOKENS.userRefreshTokenRepository).toInstance(UserRefreshTokensRepository).inSingletonScope();
container.bind(TOKENS.userRefreshTokenService).toInstance(UserRefreshTokensService).inSingletonScope();

/**
 * Auth
 */
container.bind(TOKENS.authController).toInstance(AuthController).inSingletonScope();
container.bind(TOKENS.autService).toInstance(AuthService).inSingletonScope();
container.bind(TOKENS.hashService).toInstance(HashService).inSingletonScope();

injected(Logger, TOKENS.asyncLocalStorage);
export { container };
