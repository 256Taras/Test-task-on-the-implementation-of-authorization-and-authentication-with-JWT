export class UnknownDbError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnknownDbError';
  }
}

export class NotNullException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotNullException';
  }
}

export class ForeignKeyViolationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForeignKeyViolationException';
  }
}

export class UniqueViolationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UniqueViolationException';
  }
}

export class CheckViolationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CheckViolationException';
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const mapPgError = (error: any) => {
  if (!error?.code) return new UnknownDbError(error);
  switch (error.code) {
    case '23502': {
      throw new NotNullException(error);
    }
    case '23503': {
      throw new ForeignKeyViolationException(error);
    }
    case '23505': {
      throw new UniqueViolationException(error);
    }
    case '23514': {
      throw new CheckViolationException(error);
    }
    default: {
      throw new UnknownDbError(error);
    }
  }
};

export const mapDbError = mapPgError;
