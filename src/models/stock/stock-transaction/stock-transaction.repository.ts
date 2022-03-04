import { EntityRepository, Repository } from 'typeorm';

import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';

@EntityRepository(StockTransaction)
export class StockTransactionRepository extends Repository<StockTransaction> {
  getInvestedAmountBalance() {
    return this.createQueryBuilder('transaction')
      .select('action')
      .addSelect('SUM(total_in_euro::NUMERIC)', 'amount')
      .groupBy('action')
      .getRawMany();
  }
}
