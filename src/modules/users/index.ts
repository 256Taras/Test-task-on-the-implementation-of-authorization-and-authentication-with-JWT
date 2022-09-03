import { injected } from 'brandi';

import { container } from '../../common/infra/container';
import { TOKENS } from '../../types';

import { UsersController } from './users-controller';
import { UsersService } from './users-service';

injected(UsersService, TOKENS.userRepository);
injected(UsersController, TOKENS.userService, TOKENS.userContextService, TOKENS.loggerService);

export const userModule = container.get(TOKENS.userController);
