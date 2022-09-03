import { token } from 'brandi';
import { UsersRepository } from './users-repository';
import { UsersService } from './users-service';
import { UsersController } from './users-controller';

export const USERS_TOKENS = {
  userController: token<UsersController>('userController'),
  userService: token<UsersService>('userService'),
  userRepository: token<UsersRepository>('userRepository'),
};
