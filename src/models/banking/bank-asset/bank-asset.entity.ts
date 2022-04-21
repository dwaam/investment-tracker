import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Bank } from '@/models/banking/bank/bank.entity';
import { BankAssetTypeEnum } from '@/models/banking/bank-asset/bank-asset.enum';

@Entity('bank-asset')
export class BankAsset {
  @Generated('uuid')
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({
    name: 'type',
    nullable: false,
    type: 'enum',
    enum: BankAssetTypeEnum,
  })
  type: string;

  @Column({ name: 'amount', type: 'double precision', nullable: true })
  amount: number;

  @Column({ name: 'interest_percentage', type: 'double precision', nullable: true })
  percentageInterest: number | null;

  @Column({ name: 'maximum_amount', type: 'double precision', nullable: true })
  maximumAmount: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @JoinColumn({ name: 'bank_id' })
  @ManyToOne(() => Bank, (bank) => bank.id, { cascade: ['insert', 'update'] })
  bank: Bank;
}
