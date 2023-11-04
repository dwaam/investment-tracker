import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@/models/user/user.service';
import { AccessTokenDto, SignInDto } from '@/auth/auth.interfaces';
import { User } from '@/models/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  validateUser(userName: string, pass: string): User {
    const user = this.usersService.findOne(userName);

    if (user && user.password === pass) {
      return user;
    }

    return null;
  }

  login(signInDto: SignInDto): AccessTokenDto {
    const user = this.usersService.findOne(signInDto.userName);

    const payload = { id: user.id, userName: user.userName };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
