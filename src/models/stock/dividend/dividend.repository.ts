import { Between, Repository } from 'typeorm';
import { DateTime } from 'luxon';

import { InvestedAmountsByMonthRaw } from '@/models/stock/stock.interface';
import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { CustomRepository } from '@/config/database/toDelete/typeorm-ex.decorator';

@CustomRepository(Dividend)
export class DividendRepository extends Repository<Dividend> {
  getDividendByMonth() {
    return this.createQueryBuilder('dividend')
      .select("date_trunc('month', date) AS month")
      .addSelect('SUM(total_in_euro::NUMERIC)', 'amount')
      .groupBy('month')
      .getRawMany<InvestedAmountsByMonthRaw>();
  }

  getDividendsPerYear(year: number) {
    const beginDate = DateTime.fromISO(`${year}-01-01`);
    const endDate = DateTime.fromISO(`${year}-12-31`);

    return this.find({
      relations: {
        index: {
          country: true,
        },
      },
      where: {
        date: Between(beginDate, endDate),
      },
    });
  }
}
