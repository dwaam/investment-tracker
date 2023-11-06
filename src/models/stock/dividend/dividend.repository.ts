import { Between, Repository } from 'typeorm';
import { DateTime } from 'luxon';

import { InvestedAmountsByMonthRaw } from '@/models/stock/stock.interface';
import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { CustomRepository } from '@/config/database/toDelete/typeorm-ex.decorator';
import { UpsertDividend } from '@/models/stock/dividend/dividend.interfaces';

@CustomRepository(Dividend)
export class DividendRepository extends Repository<Dividend> {
  async getDividendByMonth(): Promise<InvestedAmountsByMonthRaw[]> {
    return this.createQueryBuilder('dividend')
      .select("date_trunc('month', date) AS month")
      .addSelect('SUM(total_in_euro::NUMERIC)', 'amount')
      .groupBy('month')
      .getRawMany<InvestedAmountsByMonthRaw>();
  }

  async getDividendsPerYear(year: number): Promise<Dividend[]> {
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

  async upsertMany(upsertDividends: UpsertDividend[]): Promise<void> {
    await this.createQueryBuilder()
      .insert()
      .into(Dividend)
      .values(upsertDividends)
      .orUpdate([], ['date', 'number_of_shares', 'price_per_share', 'stock_id'])
      .execute();
  }
}
