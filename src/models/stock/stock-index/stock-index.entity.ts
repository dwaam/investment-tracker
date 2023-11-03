import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { StockCategory } from '@/models/stock/stock-index/stock-index.enum';
import { CountryTax } from '@/models/stock/country-tax/country-tax.entity';

@Entity('stock_indexes')
export class StockIndex {
  @PrimaryColumn({ name: 'isin', type: 'varchar' })
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
  category?: StockCategory | null;

  @Column({ name: 'country' })
  countryCode: string;

  @JoinColumn({ name: 'country' })
  @ManyToOne(() => CountryTax, (country) => country.country, { nullable: true })
  country?: CountryTax;
}
