import { EntityRepository, Repository } from 'typeorm';

import { InvestedAmountsByMonthRaw } from '@/models/stock/stock.interface';
import { Dividend } from '@/models/stock/dividend/dividend.entity';

@EntityRepository(Dividend)
export class DividendRepository extends Repository<Dividend> {
  getDividendByMonth() {
    return this.createQueryBuilder('dividend')
      .select("date_trunc('month', date) AS month")
      .addSelect('SUM(total_in_euro::NUMERIC)', 'amount')
      .groupBy('month')
      .getRawMany<InvestedAmountsByMonthRaw>();
  }
}
