import { OmitType } from '@nestjs/mapped-types';

import { User } from '@/models/user/user.entity';

export class CreateUserDto extends OmitType(User, ['id'] as const) {}
