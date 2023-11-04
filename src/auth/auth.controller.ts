import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { AccessTokenDto, SignInDto } from '@/auth/auth.interfaces';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Public } from '@/auth/auth.decorator';
import { UserService } from '@/models/user/user.service';
import { User } from '@/models/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<AccessTokenDto> {
    return this.authService.login(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<User> {
    return this.userService.findOneByIdOrThrow(req.user.id);
  }
}
