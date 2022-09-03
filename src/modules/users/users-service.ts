import { randomUUID } from 'crypto';
import { request } from 'undici';

import { UsersRepository } from './users-repository';
import { IUsersDto } from './users-interfaces';
import { ISignUpDto } from '../auth/auth-interfaces';

export class UsersService {
  public constructor(private readonly _usersRepository: UsersRepository) {}

  public createOne = ({ idType, password }: ISignUpDto): Promise<IUsersDto> => {
    return this._usersRepository.createOne({
      id: randomUUID(),
      idType,
      password,
    });
  };

  public getByIdType = (id: string): Promise<IUsersDto | null> => {
    return this._usersRepository.getByIdType(id);
  };

  public getById = (id: string): Promise<IUsersDto> => {
    return this._usersRepository.getById(id);
  };

  public latency = async (): Promise<string> => {
    let result: string = '';
    const start = new Date();
    await request('https://google.com').finally(() => {
      // @ts-ignore
      result = new Date() - start + 'ms';
    });
    return result;
  };
}
