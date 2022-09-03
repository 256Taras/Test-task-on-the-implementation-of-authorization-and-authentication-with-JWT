export const jwtConfig = {
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
  accessTokenExpirationTime: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME as string,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
  refreshTokenExpirationTime: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME as string,
};
