import { Repository } from 'typeorm';

import { User } from '@/models/user/user.entity';
import { CustomRepository } from '@/config/database/toDelete/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
