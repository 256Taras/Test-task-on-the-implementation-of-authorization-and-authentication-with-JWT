import { UserRefreshTokensRepository } from '../users/user-refresh-tokens-repository';
import { UserRefreshTokensService } from '../users/user-refresh-tokens-service';
import { UsersRepository } from '../users/users-repository';
import { UsersService } from '../users/users-service';
import { AuthController } from './auth-controller';
import { AuthService } from './auth-service';
import { HashService } from './hash-service';

export const AuthModule = new AuthController(
  new AuthService(
    new UsersService(new UsersRepository()),
    new HashService(),
    new UserRefreshTokensService(
      new UserRefreshTokensRepository(),
      new HashService(),
    ),
  ),
  new UserRefreshTokensService(
    new UserRefreshTokensRepository(),
    new HashService(),
  ),
);
