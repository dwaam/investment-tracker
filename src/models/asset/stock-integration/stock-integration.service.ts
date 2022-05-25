import { Injectable } from '@nestjs/common';
import * as papa from 'papaparse';
import { createReadStream } from 'fs';

import { DataFromTrading212 } from '@/models/asset/asset.interface';
import { TRADING_212_COLUMN_NAMES } from '@/models/asset/stock-integration/stock-integration.constant';
import { StockTransactionService } from '@/models/stock/stock-transaction/stock-transaction.service';
import {
  convertToDividends,
  convertToStockTransactions,
} from '@/models/asset/stock-integration/stock-integration.converter';
import { DividendService } from '@/models/stock/dividend/dividend.service';
import { getLoggerFor } from '@/utils/logger.util';

@Injectable()
export class StockIntegrationService {
  private readonly logger = getLoggerFor('StockIntegrationService');

  constructor(private stockTransactionService: StockTransactionService, private dividendService: DividendService) {}

  readFile(fileName: string) {
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

    parseStream.on('finish', () => {
      this.handleChunkOfData(data);
    });
  }

  handleChunkOfData(stockData: DataFromTrading212[]) {
    this.logger.log('Integrate common transactions');
    this.integrateCommonTransactions(
      stockData.filter((transaction) => ['Market buy', 'Market sell'].includes(transaction.action)),
    );

    this.logger.log('Integrate dividend transactions');
    this.integrateDividends(
      stockData.filter((transaction) =>
        ['Dividend (Ordinary)', 'Dividend (Property income)'].includes(transaction.action),
      ),
    );
  }

  integrateCommonTransactions(commonTransactions: DataFromTrading212[]) {
    const convertedTransactions = convertToStockTransactions(commonTransactions);

    return this.stockTransactionService.saveAll(convertedTransactions);
  }

  integrateDividends(commonTransactions: DataFromTrading212[]) {
    const convertedTransactions = convertToDividends(commonTransactions);

    return this.dividendService.saveAll(convertedTransactions);
  }
}
