import { IUsersDto, IUsersPersistence } from './users-interfaces';

export class UsersMapper {
  public static toDto(db: IUsersPersistence): IUsersDto {
    return {
      id: db.id,
      idType: db.id_type,
      password: db.password,
    };
  }

  public static toPersistence(dto: IUsersDto): IUsersPersistence {
    return {
      id: dto.id,
      id_type: dto.idType,
      password: dto.password,
    };
  }
}
