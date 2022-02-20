import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
