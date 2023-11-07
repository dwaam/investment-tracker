import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { DividendTypeEnum } from '@/models/stock/dividend/dividend.enum';
import { StockAccountEnum } from '@/models/stock/stock.enum';

@Entity('stock_dividends')
export class Dividend {
  @PrimaryColumn({ name: 'id', type: 'bigint', generated: 'increment' })
  id: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'stock_id', type: 'text' })
  stockId: string;

  @Column({ name: 'number_of_shares', type: 'double precision' })
  numberOfShares: number;

  @Column({ name: 'price_per_share', type: 'double precision' })
  pricePerShare: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: DividendTypeEnum,
  })
  type: DividendTypeEnum;

  @Column({ name: 'total_in_euro', type: 'double precision' })
  totalInEuro: number;

  @Column({ name: 'withholding_tax', type: 'double precision' })
  withholdingTax: number;

  @Column({ name: 'stock_account', type: 'enum', enum: StockAccountEnum })
  account: StockAccountEnum;

  @JoinColumn({ name: 'index_id' })
  @ManyToOne(() => StockIndex, (index) => index.id, { cascade: ['insert', 'update'] })
  index?: StockIndex;
}
