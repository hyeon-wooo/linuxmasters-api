import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { ERole } from './role/role.enum';
import { IJwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(payload: IJwtPayload) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
