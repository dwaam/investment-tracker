import { Injectable } from '@nestjs/common';
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

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
