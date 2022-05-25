import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { DividendTypeEnum } from '@/models/stock/dividend/dividend.enum';

@Entity('stock_dividends')
export class Dividend {
  @PrimaryColumn({ name: 'date', type: 'date' })
  date: Date;

  @Column({
    name: 'type',
    nullable: false,
    type: 'enum',
    enum: DividendTypeEnum,
  })
  type: DividendTypeEnum;

  @PrimaryColumn({ name: 'number_of_shares', type: 'double precision' })
  numberOfShares: number;

  @PrimaryColumn({ name: 'price_per_share', type: 'double precision' })
  pricePerShare: number;

  @Column({ name: 'total_in_euro', type: 'double precision' })
  totalInEuro: number;

  @Column({ name: 'withholding_tax', type: 'double precision' })
  withholdingTax: number;

  @PrimaryColumn({ name: 'index_id', type: 'uuid' })
  indexId?: string;

  @JoinColumn({ name: 'index_id' })
  @ManyToOne(() => StockIndex, (index) => index.id, { cascade: ['insert', 'update'] })
  index: StockIndex;
}
