import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('bank')
export class Bank {
  @Generated('uuid')
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
