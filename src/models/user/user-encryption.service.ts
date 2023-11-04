import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserEncryptionService {
  constructor(private configService: ConfigService) {}

  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.configService.get('PASSWORD_SALT'));
  }
}
