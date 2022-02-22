import { Column, Entity, PrimaryColumn } from 'typeorm';

import { StockCategory } from '@/models/stock-index/stock-index.enum';

@Entity('stock_indexes')
export class StockIndex {
  @PrimaryColumn({ name: 'isin' })
  id: string;

  @Column({ name: 'ticker' })
  ticker: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'currency' })
  currency: string;

  @Column({
    name: 'category',
    nullable: true,
    type: 'enum',
    enum: StockCategory,
  })
  category: StockCategory | null;
}
