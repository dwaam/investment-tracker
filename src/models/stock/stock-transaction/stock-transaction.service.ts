import { Injectable } from '@nestjs/common';

import { TransactionTypeEnum } from '@/models/stock/stock-transaction/stock-transaction.enum';
import { StockTransactionRepository } from '@/models/stock/stock-transaction/stock-transaction.repository';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { getLoggerFor } from '@/utils/logger.util';
import { convertToInvestedAmountsByMonth } from '@/models/stock/stock-transaction/stock-transaction.mapper';
import {
  InvestedAmountBalance,
  UpsertStockTransaction,
} from '@/models/stock/stock-transaction/stock-transaction.interfaces';
import { InvestedAmountsByMonth } from '@/models/stock/stock.interface';

@Injectable()
export class StockTransactionService {
  private readonly logger = getLoggerFor(StockTransactionService.name);

  constructor(private stockTransactionRepository: StockTransactionRepository) {}

  async saveOne(stockTransaction: StockTransaction): Promise<StockTransaction> {
    return this.stockTransactionRepository.save(stockTransaction);
  }

  async saveAll(stockTransactions: StockTransaction[]): Promise<StockTransaction[]> {
    return this.stockTransactionRepository.save(stockTransactions);
  }

  async getInvestedAmountBalance(): Promise<InvestedAmountBalance> {
    this.logger.info('Get invested amount balance.');

    const sumsByType = await this.stockTransactionRepository.getInvestedAmountBalance();

    return {
      bought: sumsByType.find((sum) => sum.action === TransactionTypeEnum.BUY).amount,
      sold: sumsByType.find((sum) => sum.action === TransactionTypeEnum.SELL).amount,
    };
  }

  async getInvestedAmountsByMonth(): Promise<InvestedAmountsByMonth[]> {
    this.logger.info('Get invested amounts by month.');

    return convertToInvestedAmountsByMonth(await this.stockTransactionRepository.getAmountInvestedByMonth());
  }

  async upsertMany(updateStockTransactions: UpsertStockTransaction[]): Promise<void> {
    this.logger.info(`Upserting ${updateStockTransactions.length} stock transactions.`);

    return this.stockTransactionRepository.upsertMany(updateStockTransactions);
  }
}
