import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockTransaction } from './stock-transaction.entity';
import { StockBalance } from '@/models/stock/stock.interface';
import { TransactionTypeEnum } from '@/models/stock/stock-transaction/stock-transaction.enum';

@Injectable()
export class StockTransactionService {
  constructor(
    @InjectRepository(StockTransaction)
    private stockTransactionRepository: Repository<StockTransaction>,
  ) {}

  saveOne(stockTransaction: StockTransaction) {
    return this.stockTransactionRepository.save(stockTransaction);
  }

  saveAll(stockTransactions: StockTransaction[]) {
    return this.stockTransactionRepository.save(stockTransactions);
  }

  async getInvestedAmountBalance(): Promise<StockBalance> {
    const sumsByType = await this.stockTransactionRepository
      .createQueryBuilder('transaction')
      .select('action')
      .addSelect('SUM(total_in_euro::NUMERIC)', 'amount')
      .groupBy('action')
      .getRawMany();

    return {
      bought: sumsByType.find((sum) => sum.action === TransactionTypeEnum.BUY).amount,
      sold: sumsByType.find((sum) => sum.action === TransactionTypeEnum.SELL).amount,
    };
  }
}
