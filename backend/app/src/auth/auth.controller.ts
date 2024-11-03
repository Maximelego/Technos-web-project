import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import TokenPairDto from './dto/tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {

  }

  @Post('logout')
  logout(@Body() tokenPairDto: TokenPairDto) {

  }

  @Post('refresh')
  refresh(@Body() tokenPairDto: TokenPairDto) {

  }
}
