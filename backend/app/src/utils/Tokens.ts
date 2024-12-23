import { TokenPairDto } from '../auth/dto/tokens.dto';
import {
  Algorithm,
  JsonWebTokenError,
  sign,
  SignOptions,
  TokenExpiredError,
  verify,
} from 'jsonwebtoken';

import {
  ExpiredTokenException,
  InvalidTokenException,
  TokenRevokedException,
} from './HTTPExceptions';
import { RedisInterface } from './Redis';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot().then();

enum TokenTypes {
  AUTH_TOKEN = 'AUTH_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export type TokenPayload = {
  id: number;
  iat: number;
  exp: number;
};

export default class Tokens {
  private accessToken: string;
  private refreshToken: string;

  // Environnment variables
  private static readonly authExpireTime: number =
    Number.parseInt(process.env.AUTH_TOKEN_EXPIRE) ?? 3600000;
  private static readonly refreshExpireTime: number =
    Number.parseInt(process.env.REFRESH_TOKEN_EXPIRE) ?? 604800000;
  private static readonly jwtAuthKey: string =
    process.env.JWT_AUTH_TOKEN_SECRET_KEY ?? '';
  private static readonly jwtRefreshKey: string =
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY ?? '';
  private static readonly algorithm: Algorithm = (process.env.JWT_ALGORITHM ??
    'HS256') as Algorithm;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  toDto(): TokenPairDto {
    return {
      access_token: this.accessToken,
      refresh_token: this.refreshToken,
    };
  }

  async invalidateTokens(): Promise<void> {
    await RedisInterface.revoke(
      this.accessToken,
      verify(this.accessToken, Tokens.jwtAuthKey, {
        algorithms: [Tokens.algorithm],
      }) as TokenPayload,
    );

    await RedisInterface.revoke(
      this.refreshToken,
      verify(this.refreshToken, Tokens.jwtAuthKey, {
        algorithms: [Tokens.algorithm],
      }) as TokenPayload,
    );
  }

  async refreshTokens(): Promise<void> {
    try {
      const tokenPayload: TokenPayload = verify(
        this.refreshToken,
        Tokens.jwtAuthKey,
        { algorithms: [Tokens.algorithm] },
      ) as TokenPayload;
      if (await RedisInterface.isRevoked(this.refreshToken))
        throw new TokenRevokedException();

      await this.invalidateTokens();
      this.accessToken = await Tokens.generateToken(
        tokenPayload.id,
        TokenTypes.AUTH_TOKEN,
      );
      this.refreshToken = await Tokens.generateToken(
        tokenPayload.id,
        TokenTypes.REFRESH_TOKEN,
      );
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new ExpiredTokenException();
      } else if (e instanceof JsonWebTokenError) {
        throw new InvalidTokenException();
      } else {
        throw e;
      }
    }
  }

  static async isTokenRevoked(token: string) {
    return await RedisInterface.isRevoked(token);
  }

  static async generateTokens(user_id: number): Promise<Tokens> {
    const accessToken: string = await Tokens.generateToken(
      user_id,
      TokenTypes.AUTH_TOKEN,
    );
    const refreshToken: string = await Tokens.generateToken(
      user_id,
      TokenTypes.REFRESH_TOKEN,
    );
    return new Tokens(accessToken, refreshToken);
  }

  private static async generateToken(
    user_id: number,
    tokenType: TokenTypes,
  ): Promise<string> {
    const payload: TokenPayload = {
      id: user_id,
      iat: Math.floor(Date.now() / 1000),
      exp: 0,
    };

    const options: SignOptions = {
      algorithm: Tokens.algorithm,
    };

    switch (tokenType) {
      case TokenTypes.AUTH_TOKEN:
        payload.exp = payload.iat + Math.floor(Tokens.authExpireTime / 1000);
        return sign(payload, Tokens.jwtAuthKey, options);
      case TokenTypes.REFRESH_TOKEN:
        payload.exp = payload.iat + Math.floor(Tokens.refreshExpireTime / 1000);
        return sign(payload, Tokens.jwtRefreshKey, options);
      default:
        return '';
    }
  }
}
