import * as crypto from 'crypto';

export class HashService {
  private saltRounds = 10;
  private keyLength = 64;

  public async getHash(password: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      const salt = crypto
        .randomBytes(this.saltRounds)
        .toString('hex');
      crypto.scrypt(
        password,
        salt,
        this.keyLength,
        (err, derivedKey) => {
          if (err) reject(err);
          resolve(salt + ':' + derivedKey.toString('hex'));
        },
      );
    });
  }

  public async compareHash(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      const [salt, key] = passwordHash.split(':');
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        //
        resolve(key == derivedKey.toString('hex'));
      });
    });
  }
}
