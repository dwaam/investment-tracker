import { Injectable } from '@nestjs/common';
import { StockTransaction } from './stock-transaction.entity';
import { TransactionTypeEnum } from '@/models/stock/stock-transaction/stock-transaction.enum';
import { StockTransactionRepository } from '@/models/stock/stock-transaction/stock-transaction.repository';

@Injectable()
export class StockTransactionService {
  constructor(private stockTransactionRepository: StockTransactionRepository) {}

  saveOne(stockTransaction: StockTransaction) {
    return this.stockTransactionRepository.save(stockTransaction);
  }

  saveAll(stockTransactions: StockTransaction[]) {
    return this.stockTransactionRepository.save(stockTransactions);
  }

  async getInvestedAmountBalance(): Promise<any> {
    const sumsByType = await this.stockTransactionRepository.getInvestedAmountBalance();

    return {
      bought: sumsByType.find((sum) => sum.action === TransactionTypeEnum.BUY).amount,
      sold: sumsByType.find((sum) => sum.action === TransactionTypeEnum.SELL).amount,
    };
  }
}
