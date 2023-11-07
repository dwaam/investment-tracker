import { Repository } from 'typeorm';

import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { InvestedAmountsByMonthRaw } from '@/models/stock/stock.interface';
import { CustomRepository } from '@/config/database/toDelete/typeorm-ex.decorator';
import { UpsertStockTransaction } from '@/models/stock/stock-transaction/stock-transaction.interfaces';

@CustomRepository(StockTransaction)
export class StockTransactionRepository extends Repository<StockTransaction> {
  async getInvestedAmountBalance() {
    return this.createQueryBuilder('transaction')
      .select('action')
      .addSelect('SUM(total_in_euro::NUMERIC)', 'amount')
      .groupBy('action')
      .getRawMany();
  }

  async getAmountInvestedByMonth(): Promise<InvestedAmountsByMonthRaw[]> {
    return this.createQueryBuilder('transaction')
      .select("date_trunc('month', date) AS month")
      .addSelect('SUM(total_in_euro::NUMERIC)', 'amount')
      .addSelect('action')
      .groupBy('month')
      .addGroupBy('action')
      .getRawMany<InvestedAmountsByMonthRaw>();
  }

  async upsertMany(upsertStockTransactions: UpsertStockTransaction[]): Promise<void> {
    await this.createQueryBuilder()
      .insert()
      .into(StockTransaction)
      .values(upsertStockTransactions)
      .orIgnore()
      .execute();
  }
}
