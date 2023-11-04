import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { User } from '@/models/user/user.entity';
import { CreateUserDto } from '@/models/user/user.interfaces';
import { UserRepository } from '@/models/user/user.repository';
import { UserAlreadyExistsException } from '@/models/user/user.exception';
import { UserEncryptionService } from '@/models/user/user-encryption.service';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private userEncryptionService: UserEncryptionService) {}

  private readonly users: User[] = [
    {
      id: 'uuid1',
      userName: 'john',
      firstName: 'John',
      lastName: 'Doe',
      password: 'changeme',
    },
    {
      id: 'uuid2',
      userName: 'maria',
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'guess',
    },
  ];

  findOne(userName: string): User | undefined {
    return this.users.find((user) => user.userName === userName);
  }

  findOneByIdOrThrow(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      return plainToInstance(User, user);
    }

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
