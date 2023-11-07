import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { User } from '@/models/user/user.entity';
import { CreateUserDto } from '@/models/user/user.interfaces';
import { UserRepository } from '@/models/user/user.repository';
import { UserAlreadyExistsException } from '@/models/user/user.exception';
import { UserEncryptionService } from '@/models/user/user-encryption.service';
import { getLoggerFor } from '@/utils/logger.util';

@Injectable()
export class UserService {
  private readonly logger = getLoggerFor(UserService.name);

  constructor(private userRepository: UserRepository, private userEncryptionService: UserEncryptionService) {}

  async findOneByUserName(userName: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { userName } });
  }

  async findOneByIdOrThrow(id: string): Promise<User> {
    this.logger.info(`Find user with id "${id}"`);

    return this.userRepository.findOneByOrFail({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const doesTheUserAlreadyExist = await this.isUserNameAlreadyExisting(createUserDto.userName);

    if (doesTheUserAlreadyExist) {
      throw new UserAlreadyExistsException();
    }

    const hashedPassword = await this.userEncryptionService.encryptPassword(createUserDto.password);

    const userWithHashedPassword: CreateUserDto = {
      ...createUserDto,
      password: hashedPassword,
    };

    const createdUser = await this.userRepository.save(userWithHashedPassword);

    return plainToInstance(User, createdUser);
  }

  async isUserNameAlreadyExisting(userName: string): Promise<boolean> {
    return this.userRepository.exist({
      where: {
        userName,
      },
    });
  }
}
