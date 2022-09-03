import { token } from 'brandi';

import { UserRefreshTokensRepository } from './user-refresh-tokens-repository';
import { UserRefreshTokensService } from './user-refresh-tokens-service';

export const USERS_REFRESH_TOKENS = {
  userRefreshTokenRepository: token<UserRefreshTokensRepository>('userRefreshTokenRepository'),
  userRefreshTokenService: token<UserRefreshTokensService>('userRefreshTokenService'),
};
