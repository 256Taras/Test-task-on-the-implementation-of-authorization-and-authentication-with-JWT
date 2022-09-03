import { queryRunner } from '../../common/infra/db';
import { lookup } from '../../common/utils/common';
import { tables } from '../../configs';

import { IUserRefreshTokensDto } from './user-refresh-tokens-interfaces';
import { UserRefreshTokensMapper } from './user-refresh-tokens-mapper';

export class UserRefreshTokensRepository {
  public create({ id, ppid, userId }: IUserRefreshTokensDto): Promise<IUserRefreshTokensDto> {
    return queryRunner({
      query: `
            INSERT INTO "${tables.userRefreshToken}" 
                   ("id", "ppid", "user_id")
            VALUES ($1, $2, $3) 
            RETURNING *
            `,
      bindings: [id, ppid, userId],
      resultMapper: UserRefreshTokensMapper.toDto,
      enableLog: true,
    }).then(lookup);
  }

  public deleteById(id: string): Promise<IUserRefreshTokensDto> {
    return queryRunner({
      query: `
            DELETE FROM "${tables.userRefreshToken}" 
            WHERE id = $1
            RETURNING *
            `,
      bindings: [id],
      resultMapper: UserRefreshTokensMapper.toDto,
      enableLog: true,
    }).then(lookup);
  }

  public deleteByUserId(userId: string): Promise<IUserRefreshTokensDto> {
    return queryRunner({
      query: `
            DELETE FROM "${tables.userRefreshToken}" 
            WHERE user_id = $1 
            RETURNING *
            `,
      bindings: [userId],
      resultMapper: UserRefreshTokensMapper.toDto,
      enableLog: true,
    }).then(lookup);
  }

  public getById = (refreshTokenId: string) => {
    return queryRunner({
      query: `
            SELECT *
            FROM "${tables.userRefreshToken}" 
            WHERE id = $1
            `,
      bindings: [refreshTokenId],
      resultMapper: UserRefreshTokensMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };
}
