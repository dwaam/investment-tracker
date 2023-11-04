import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { User } from '@/models/user/user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 'uuid1',
      username: 'john',
      password: 'changeme',
    },
    {
      id: 'uuid2',
      username: 'maria',
      password: 'guess',
    },
  ];

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  findOneByIdOrThrow(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      return plainToInstance(User, user);
    }

    throw new Error(`User with id ${id} does not exist.`);
  }
}
