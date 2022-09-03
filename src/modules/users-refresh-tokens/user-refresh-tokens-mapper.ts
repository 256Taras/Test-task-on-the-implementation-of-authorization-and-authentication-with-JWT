import { IUserRefreshTokensDto, IUserRefreshTokensPersistence } from './user-refresh-tokens-interfaces';

export class UserRefreshTokensMapper {
  public static toDto(db: IUserRefreshTokensPersistence): IUserRefreshTokensDto {
    return {
      id: db.id,
      ppid: db.ppid,
      userId: db.user_id,
    };
  }

  public static toPersistence(dto: IUserRefreshTokensDto): IUserRefreshTokensPersistence {
    return {
      id: dto.id,
      ppid: dto.ppid,
      user_id: dto.userId,
    };
  }
}
