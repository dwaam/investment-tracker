import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IsUUID } from 'class-validator';

import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { DividendTypeEnum } from '@/models/stock/dividend/dividend.enum';
import { StockAccountEnum } from '@/models/stock/stock.enum';
import { User } from '@/models/user/user.entity';

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

  @JoinColumn({ name: 'stock_id' })
  @ManyToOne(() => StockIndex, (index) => index.id, { cascade: ['insert', 'update'] })
  index?: StockIndex;

  @IsUUID()
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.dividends)
  user: User;
}
