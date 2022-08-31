import { UsersController } from './users-controller';
import { UsersRepository } from './users-repository';
import { UsersService } from './users-service';

export const UsersModule = new UsersController(
  new UsersService(new UsersRepository()),
);
