import { randomBytes, randomUUID } from 'crypto';

import { SUCCESS } from '../../configs/constants';
import { ISuccess } from '../../common/interfaces/responce-interface';

import { UserRefreshTokensRepository } from './user-refresh-tokens-repository';
import { IUserRefreshTokensDto } from './user-refresh-tokens-interfaces';
import { HashService } from '../auth/hash-service';
import { ForbiddenException } from '../../common/errors/common';

export class UserRefreshTokensService {
  public constructor(
    private readonly _userRefreshTokensRepository: UserRefreshTokensRepository,
    private readonly _hashService: HashService,
  ) {}

  public generateAndCreateOne = async (userId: string): Promise<IUserRefreshTokensDto> => {
    const refreshIdentifier = randomBytes(16).toString('hex');
    const refreshHash = await this._hashService.getHash(refreshIdentifier);
    return await this._userRefreshTokensRepository.create({
      id: randomUUID(),
      userId,
      ppid: refreshHash,
    });
  };

  public deleteOneOrAll = async (id: string, userId: string | null): Promise<ISuccess> => {
    const tokenEntity = await this._userRefreshTokensRepository.getById(id);
    if (!tokenEntity) throw new ForbiddenException('Unauthorized');
    userId
      ? await this._userRefreshTokensRepository.deleteByUserId(userId)
      : await this._userRefreshTokensRepository.deleteById(id);
    return SUCCESS;
  };

  public getById(refreshTokenId: string): Promise<IUserRefreshTokensDto> {
    return this._userRefreshTokensRepository.getById(refreshTokenId);
  }
}
