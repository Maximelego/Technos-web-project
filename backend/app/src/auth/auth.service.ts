import { Injectable } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import TokenPairDto from './dto/tokens.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InvalidLoginOrPasswordException } from '../utils/HTTPExceptions';
import { verifyPassword } from '../utils/Security';
import Tokens from '../utils/Tokens';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto): Promise<TokenPairDto> {
    // We get the user by the login.
    const user: User = await this.userRepository.findOneBy({
      login: loginDto.login,
    });
    // We check if the login is used and if the hashes corresponds.
    if (!user || !(await verifyPassword(loginDto.password, user.hash)))
      throw new InvalidLoginOrPasswordException();

    const tokenPair: Tokens = await Tokens.generateTokens(user.id);
    return tokenPair.toDto();
  }

  async logout(tokens: TokenPairDto): Promise<void> {
    const tokenPair: Tokens = new Tokens(
      tokens.access_token,
      tokens.refresh_token,
    );
    await tokenPair.invalidateTokens();
  }

  async refreshTokens(tokens: TokenPairDto): Promise<TokenPairDto> {
    const tokenPair: Tokens = new Tokens(
      tokens.access_token,
      tokens.refresh_token,
    );
    return await tokenPair.refreshTokens();
  }
}
