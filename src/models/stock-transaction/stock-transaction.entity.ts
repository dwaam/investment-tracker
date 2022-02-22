import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { StockIndex } from '@/models/stock-index/stock-index.entity';

@Entity('stock_transactions')
export class StockTransaction {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'action' })
  action: string;

  @Column({ name: 'number_of_shares' })
  numberOfShares: number;

  @Column({ name: 'price_per_share' })
  pricePerShare: number;

  @Column({ name: 'exchange_rate' })
  exchangeRate: number;

  @Column({ name: 'total_in_euro' })
  totalInEuro: number;

  @Column({ name: 'currency_conversion_fee' })
  currencyConversionFee: number;

  @JoinColumn({ name: 'index_id' })
  @ManyToOne(() => StockIndex, (index) => index.id, { cascade: ['insert', 'update'] })
  index: StockIndex;
}
