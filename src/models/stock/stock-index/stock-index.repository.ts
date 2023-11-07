import { Repository } from 'typeorm';

import { CustomRepository } from '@/config/database/toDelete/typeorm-ex.decorator';
import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';

@CustomRepository(StockIndex)
export class StockIndexRepository extends Repository<StockIndex> {
  async upsertMany(stockIndices: StockIndex[]): Promise<void> {
    await this.createQueryBuilder()
      .insert()
      .into(StockIndex)
      .values(stockIndices)
      .orUpdate(['ticker', 'name', 'currency', 'country'], ['isin'])
      .execute();
  }
}
