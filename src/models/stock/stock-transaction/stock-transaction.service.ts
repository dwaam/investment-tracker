import { Injectable } from '@nestjs/common';

import { TransactionTypeEnum } from '@/models/stock/stock-transaction/stock-transaction.enum';
import { StockTransactionRepository } from '@/models/stock/stock-transaction/stock-transaction.repository';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { getLoggerFor } from '@/utils/logger.util';
import { convertToInvestedAmountsByMonth } from '@/models/stock/stock-transaction/stock-transaction.mapper';

@Injectable()
export class StockTransactionService {
  private readonly logger = getLoggerFor('StockTransactionService');

  constructor(private stockTransactionRepository: StockTransactionRepository) {}

  saveOne(stockTransaction: StockTransaction) {
    return this.stockTransactionRepository.save(stockTransaction);
  }

  saveAll(stockTransactions: StockTransaction[]) {
    return this.stockTransactionRepository.save(stockTransactions);
  }

  async getInvestedAmountBalance(): Promise<any> {
    this.logger.log('Get invested amount balance');
    const sumsByType = await this.stockTransactionRepository.getInvestedAmountBalance();

    return {
      bought: sumsByType.find((sum) => sum.action === TransactionTypeEnum.BUY).amount,
      sold: sumsByType.find((sum) => sum.action === TransactionTypeEnum.SELL).amount,
    };
  }

  async getInvestedAmountsByMonth() {
    this.logger.log('Get invested amounts by month');
    return convertToInvestedAmountsByMonth(await this.stockTransactionRepository.getAmountInvestedByMonth());
  }
}
