import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from '@/models/user/user.interfaces';
import { Public } from '@/auth/auth.decorator';
import { UserService } from '@/models/user/user.service';
import { User } from '@/models/user/user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
