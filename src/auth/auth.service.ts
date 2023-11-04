import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/models/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '@/auth/auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(signInDto: SignInDto) {
    const user = await this.usersService.findOne(signInDto.username);

    const payload = { id: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
