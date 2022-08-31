export class BadRequestException extends Error {
  private statusCode: number;
  public constructor(message: string) {
    super(message);
    this.name = 'BadRequestException';
    this.statusCode = 400;
  }
}

export class ForbiddenException extends Error {
  private statusCode: number;
  public constructor(message: string) {
    super(message);
    this.name = 'ForbiddenException';
    this.statusCode = 403;
  }
}

export class BadCredentialsException extends Error {
  private statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'BadCredentialsException';
    this.statusCode = 401;
  }
}

export class ResourceAlreadyExistException extends Error {
  private statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'ResourceAlreadyExistException';
    this.statusCode = 409;
  }
}
