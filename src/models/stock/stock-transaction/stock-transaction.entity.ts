import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { TransactionTypeEnum } from '@/models/stock/stock-transaction/stock-transaction.enum';

@Entity('stock_transactions')
export class StockTransaction {
  @PrimaryColumn({ name: 'id', type: 'bigint', generated: 'increment' })
  id: string;

  @Column({ name: 'transaction_id', type: 'text' })
  transactionId: string;

  @Column({ name: 'stock_id', type: 'uuid' })
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

  @JoinColumn({ name: 'index_id' })
  @ManyToOne(() => StockIndex, (index) => index.id, { cascade: ['insert', 'update'] })
  index?: StockIndex;
}
