import { Injectable } from '@nestjs/common';
import { User } from '@/models/user/user.entity';
import { plainToInstance } from 'class-transformer';

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

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findOneByIdOrThrow(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      return plainToInstance(User, user);
    }

    throw new Error(`User with id ${id} does not exist.`);
  }
}
