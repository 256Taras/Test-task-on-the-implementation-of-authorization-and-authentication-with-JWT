import { token } from 'brandi';

import { AuthController } from './auth-controller';
import { AuthService } from './auth-service';
import { HashService } from './hash-service';

export const AUTH_TOKENS = {
  authController: token<AuthController>('authController'),
  autService: token<AuthService>('autService'),
  hashService: token<HashService>('hashService'),
};
