import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { SignInDto } from '@/auth/auth.interfaces';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '@/auth/auth.decorator';
import { UserService } from '@/models/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOneByIdOrThrow(req.user.id);
  }
}
