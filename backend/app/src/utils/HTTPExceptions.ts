import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidLoginOrPasswordException extends HttpException {
  constructor() {
    super('Invalid login or password.', HttpStatus.UNAUTHORIZED);
  }
}

export class ExpiredTokenException extends HttpException {
  constructor() {
    super('Token expired', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidTokenException extends HttpException {
  constructor() {
    super('Token invalid', HttpStatus.UNAUTHORIZED);
  }
}

export class TokenRevokedException extends HttpException {
  constructor() {
    super('Token revoked', HttpStatus.UNAUTHORIZED);
  }
}