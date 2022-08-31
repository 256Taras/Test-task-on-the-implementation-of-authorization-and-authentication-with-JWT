export interface ISignUpDto {
  readonly idType: string;
  readonly password: string;
}

export interface ISignUpBodyDto {
  readonly id: string;
  readonly password: string;
}

export interface ISignInDto {
  readonly id: string;
  readonly password: string;
}

export interface IJwtAccessTokenPayloadDto {
  readonly id: string;
  readonly refreshTokenId: string;
}

export interface IJwtRefreshTokenPayloadDto
  extends IJwtAccessTokenPayloadDto {
  readonly ppid: string;
}

export interface IJwtTokensDto {
  readonly token: string;
  readonly refreshToken: string;
}

export interface IQueryParamsLogout {
  all?: boolean;
}
