import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '@/models/user/user.service';
import { AccessTokenDto, SignInDto } from '@/auth/auth.interfaces';
import { User } from '@/models/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async validateUser(userName: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByUserName(userName);

    if (user && user.password === pass) {
      return user;
    }

    return null;
  }

  async login(signInDto: SignInDto): Promise<AccessTokenDto> {
    const user = await this.usersService.findOneByUserName(signInDto.userName);

    if (!user) {
      throw new UnauthorizedException('Username does not exist');
    }

    const isValid = await bcrypt.compare(signInDto.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { id: user.id, userName: user.userName };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
