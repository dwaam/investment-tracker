import { createReadStream } from 'fs';

import { Injectable } from '@nestjs/common';
import * as papa from 'papaparse';

import { TRADING_212_COLUMN_NAMES } from '@/models/stock/stock-integration/stock-integration.constant';
import { StockTransactionService } from '@/models/stock/stock-transaction/stock-transaction.service';
import {
  convertToDividends,
  convertToStockIndices,
  convertToStockTransactions,
} from '@/models/stock/stock-integration/stock-integration.converter';
import { DividendService } from '@/models/stock/dividend/dividend.service';
import { getLoggerFor } from '@/utils/logger.util';
import { StockIndexService } from '@/models/stock/stock-index/stock-index.service';
import { DataFromTrading212 } from '@/models/stock/stock-integration/stock-integration.interface';

@Injectable()
export class StockIntegrationService {
  private readonly logger = getLoggerFor(StockIntegrationService.name);

  constructor(
    private stockTransactionService: StockTransactionService,
    private dividendService: DividendService,
    private stockIndexService: StockIndexService,
  ) {}

  readFile(userId: string, fileName: string): void {
    this.logger.info(`Reading file with name "${fileName}" for user "${userId}".`);

    const parseStream = papa.parse(papa.NODE_STREAM_INPUT, {
      header: true,
      dynamicTyping: true,
      transformHeader: function (h, index) {
        return TRADING_212_COLUMN_NAMES[index];
      },
    });

    createReadStream(fileName).pipe(parseStream);

    const data = [];

    parseStream.on('data', (chunk) => {
      data.push(chunk);
    });

    parseStream.on('finish', async () => {
      return this.handleChunkOfData(userId, data);
    });
  }

  async handleChunkOfData(userId: string, stockData: DataFromTrading212[]): Promise<void> {
    const commonTransactions = stockData.filter((transaction) =>
      ['Market buy', 'Market sell'].includes(transaction.action),
    );
    const dividendTransactions = stockData.filter((transaction) =>
      ['Dividend (Ordinary)', 'Dividend (Property income)', 'Dividend (Bonus)'].includes(transaction.action),
    );

    await this.integrateStockIndices(userId, [...commonTransactions, ...dividendTransactions]);

    await this.integrateCommonTransactions(userId, commonTransactions);

    await this.integrateDividends(userId, dividendTransactions);
  }

  async integrateStockIndices(userId: string, transactions: DataFromTrading212[]): Promise<void> {
    this.logger.info(`Integrate stock indices from ${transactions.length} transactions.`);

    const convertedTransactions = convertToStockIndices(transactions);

    return this.stockIndexService.upsertMany(convertedTransactions);
  }

  async integrateCommonTransactions(userId: string, commonTransactions: DataFromTrading212[]): Promise<void> {
    this.logger.info(`Integrate common transactions from ${commonTransactions.length} transactions.`);

    const convertedTransactions = convertToStockTransactions(userId, commonTransactions);

    return this.stockTransactionService.upsertMany(convertedTransactions);
  }

  async integrateDividends(userId: string, dividendTransactions: DataFromTrading212[]): Promise<void> {
    this.logger.info(`Integrate dividends from ${dividendTransactions.length} transactions.`);

    const convertedTransactions = convertToDividends(userId, dividendTransactions);

    return this.dividendService.upsertMany(convertedTransactions);
  }
}
