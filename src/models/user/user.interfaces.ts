import { OmitType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { User } from '@/models/user/user.entity';

export class CreateUserDto extends OmitType(User, ['id', 'password'] as const) {
  @Expose()
  @IsString()
  password: string;
}
