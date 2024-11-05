import { Redis } from 'ioredis';
import * as process from 'node:process';
import { TokenPayload } from './Tokens';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export class RedisInterface {
  private static redisConnection: Redis = new Redis({
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    host: 'redis',
    password: 'bbb165341087c976f9001e1a51bcd0f6e4f1e1e2e929d85dd5afc07f4fc7d167',
    db: parseInt(process.env.REDIS_DB || '0', 10),
  });

  /**
   * This method checks if the token provided is revoked or not.
   * @param encodedToken Token to check.
   */
  static async isRevoked(encodedToken: string): Promise<boolean> {
    return !!(await RedisInterface.redisConnection.get(encodedToken));
  }

  /**
   * This method revokes the token provided until it expires.
   * @param encodedToken Token to revoke.
   * @param tokenPayload Data about the token to revoke.
   */
  static async revoke(
    encodedToken: string,
    tokenPayload: TokenPayload,
  ): Promise<void> {
    await RedisInterface.redisConnection.setex(
      encodedToken,
      tokenPayload.exp - Math.floor(Date.now() / 1000),
      tokenPayload.id,
    );
  }
}
