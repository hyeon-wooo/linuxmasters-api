import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { ERole } from './role/role.enum';
import { IJwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(password, salt, inputPassword) {
    if (password === this.hashPassword(inputPassword, salt)) return true;

    return false;
  }

  generateToken(payload: Omit<IJwtPayload, 'role'>) {
    return {
      access_token: this.jwtService.sign({
        ...payload,
        role: payload.level >= 100 ? ERole.ADM : ERole.USR,
      }),
    };
  }

  hashPassword(password: string, salt: string) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
  }

  generateSalt(rounds) {
    if (rounds >= 15) {
      throw new Error(`${rounds} is greater than 15,Must be less that 15`);
    }
    if (typeof rounds !== 'number') {
      throw new Error('rounds param must be a number');
    }
    if (rounds == null) {
      rounds = 12;
    }
    return crypto
      .randomBytes(Math.ceil(rounds / 2))
      .toString('hex')
      .slice(0, rounds);
  }
}
