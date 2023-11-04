import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn({ name: 'country', type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({ name: 'username', type: 'text' })
  username: string;

  @Column({ name: 'password', type: 'text' })
  password: string;
}
