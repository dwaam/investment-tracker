import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IsUUID } from 'class-validator';

import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { TransactionTypeEnum } from '@/models/stock/stock-transaction/stock-transaction.enum';
import { User } from '@/models/user/user.entity';

@Entity('stock_transactions')
export class StockTransaction {
  @PrimaryColumn({ name: 'id', type: 'bigint', generated: 'increment' })
  id: string;

  @Index({ unique: true })
  @Column({ name: 'transaction_id', type: 'text' })
  transactionId: string;

  @Column({ name: 'stock_id', type: 'text' })
  stockId: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({
    name: 'action',
    nullable: false,
    type: 'enum',
    enum: TransactionTypeEnum,
  })
  action: TransactionTypeEnum;

  @Column({ name: 'number_of_shares', type: 'double precision' })
  numberOfShares: number;

  @Column({ name: 'price_per_share', type: 'double precision' })
  pricePerShare: number;

  @Column({ name: 'exchange_rate', type: 'double precision' })
  exchangeRate: number;

  @Column({ name: 'total_in_euro', type: 'double precision' })
  totalInEuro: number;

  @Column({ name: 'currency_conversion_fee', type: 'double precision' })
  currencyConversionFee: number;

  @JoinColumn({ name: 'stock_id' })
  @ManyToOne(() => StockIndex, (index) => index.id, { cascade: ['insert', 'update'] })
  index?: StockIndex;

  @IsUUID()
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.stockTransactions)
  user: User;
}
