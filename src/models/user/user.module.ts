import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { UserController } from '@/models/user/user.controller';
import { UserService } from '@/models/user/user.service';
import { TypeOrmExModule } from '@/config/database/toDelete/typeorm-ex.module';
import { User } from '@/models/user/user.entity';
import { UserRepository } from '@/models/user/user.repository';
import { UserEncryptionService } from '@/models/user/user-encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [UserController],
  providers: [UserService, UserEncryptionService, ConfigService],
  exports: [UserService],
})
export class UserModule {}
