import { Injectable } from '@nestjs/common';

import { User } from '@/models/user/user.entity';
import { CreateUserDto } from '@/models/user/user.interfaces';
import { UserRepository } from '@/models/user/user.repository';
import { UserAlreadyExistsException } from '@/models/user/user.exception';
import { UserEncryptionService } from '@/models/user/user-encryption.service';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private userEncryptionService: UserEncryptionService) {}

  async findOneByUserName(userName: string): Promise<User | undefined> {
    return this.userRepository.findOne({where: {userName}});
  }

  findOneByIdOrThrow(id: string): User | undefined {
    // const user = this.users.find((user) => user.id === id);

    // if (user) {
    //   return plainToInstance(User, user);
    // }

    throw new Error(`User with id ${id} does not exist.`);
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

    return this.userRepository.save(userWithHashedPassword);
  }

  async isUserNameAlreadyExisting(userName: string): Promise<boolean> {
    return this.userRepository.exist({
      where: {
        userName,
      },
    });
  }
}
