import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
  @PrimaryColumn({ name: 'country', type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({ name: 'username', type: 'text' })
  username: string;

  @Exclude()
  @Column({ name: 'password', type: 'text' })
  password: string;
}
