import { isEqual, uniqWith } from 'lodash';

import { TRANSACTION_TYPE_LINK } from '@/models/stock/stock-integration/stock-integration.constant';
import { DividendTypeEnum } from '@/models/stock/dividend/dividend.enum';
import { StockAccountEnum } from '@/models/stock/stock.enum';
import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { UpsertStockTransaction } from '@/models/stock/stock-transaction/stock-transaction.interfaces';
import { UpsertDividend } from '@/models/stock/dividend/dividend.interfaces';
import { DataFromTrading212 } from '@/models/stock/stock-integration/stock-integration.interface';

export function convertToStockTransaction(transaction: DataFromTrading212): UpsertStockTransaction {
  return {
    transactionId: transaction.transactionId,
    action: TRANSACTION_TYPE_LINK[transaction.action],
    currencyConversionFee: +transaction.currencyConversionFeeInEuro,
    date: new Date(transaction.date),
    exchangeRate: +transaction.exchangeRate,
    numberOfShares: +transaction.numberOfShares,
    pricePerShare: +transaction.pricePerShare,
    totalInEuro: +transaction.total,
    stockId: transaction.isin,
  };
}

export function convertToStockTransactions(transactions: DataFromTrading212[]): UpsertStockTransaction[] {
  return transactions.map((transaction) => convertToStockTransaction(transaction));
}

function getTypeFromAction(action: string): DividendTypeEnum {
  switch (action) {
    case 'Dividend (Ordinary)':
      return DividendTypeEnum.ORDINARY;
    case 'Dividend (Property income)':
      return DividendTypeEnum.PROPERTY_INCOME;
    case 'Dividend (Property income)':
      return DividendTypeEnum.PROPERTY_INCOME;
    case 'Dividend (Bonus)':
      return DividendTypeEnum.BONUS;
    default:
      throw new Error('Dividend type unknow');
  }
}

export function convertToUpsertDividend(transaction: DataFromTrading212): UpsertDividend {
  return {
    date: new Date(transaction.date),
    numberOfShares: +transaction.numberOfShares,
    pricePerShare: +transaction.pricePerShare,
    totalInEuro: +transaction.total,
    type: getTypeFromAction(transaction.action),
    withholdingTax: +transaction.withholdingTax,
    account: StockAccountEnum.TRADING_212,
    stockId: transaction.isin,
  };
}

export function convertToDividends(transactions: DataFromTrading212[]): UpsertDividend[] {
  return transactions.map((transaction) => convertToUpsertDividend(transaction));
}

export function convertToStockIndices(transactions: DataFromTrading212[]): StockIndex[] {
  const indices = transactions.map((transaction) => {
    return {
      id: transaction.isin,
      ticker: transaction.ticker,
      name: transaction.stockName,
      currency: transaction.currency,
      countryCode: transaction.isin.slice(0, 2),
    };
  });

  return uniqWith(indices, isEqual);
}
