import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

import { Asset } from '@/models/asset/asset.entity';
import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';

@Entity('user')
export class User {
  @PrimaryColumn({ name: 'id', type: 'uuid', generated: 'uuid' })
  id: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Column({ name: 'user_name', type: 'text', nullable: false, unique: true })
  userName: string;

  @IsString()
  @Column({ name: 'first_name', type: 'text', nullable: false })
  firstName: string;

  @IsString()
  @Column({ name: 'last_name', type: 'text', nullable: false })
  lastName: string;

  @Exclude()
  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;

  @OneToMany(() => Asset, (asset) => asset.user)
  assets: Asset[];

  @OneToMany(() => Dividend, (dividend) => dividend.user)
  dividends: Dividend[];

  @OneToMany(() => StockTransaction, (stockTransaction) => stockTransaction.user)
  stockTransactions: StockTransaction[];
}
