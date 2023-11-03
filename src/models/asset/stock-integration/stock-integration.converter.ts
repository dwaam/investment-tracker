import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { TRANSACTION_TYPE_LINK } from '@/models/asset/stock-integration/stock-integration.constant';
import { DataFromTrading212 } from '@/models/asset/asset.interface';
import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { DividendTypeEnum } from '@/models/stock/dividend/dividend.enum';

export function convertToStockTransaction(transaction: DataFromTrading212): StockTransaction {
  return {
    id: transaction.transactionId,
    action: TRANSACTION_TYPE_LINK[transaction.action],
    currencyConversionFee: +transaction.currencyConversionFeeInEuro,
    date: new Date(transaction.date),
    exchangeRate: +transaction.exchangeRate,
    numberOfShares: +transaction.numberOfShares,
    pricePerShare: +transaction.pricePerShare,
    totalInEuro: +transaction.total,
    index: {
      id: transaction.isin,
      ticker: transaction.ticker,
      name: transaction.stockName,
      currency: transaction.currency,
      countryCode: transaction.isin.slice(0, 2),
    },
  };
}

export function convertToStockTransactions(transactions: DataFromTrading212[]): StockTransaction[] {
  return transactions.map((transaction) => convertToStockTransaction(transaction));
}

function getTypeFromAction(action: string) {
  switch (action) {
    case 'Dividend (Ordinary)':
      return DividendTypeEnum.ORDINARY;
    case 'Dividend (Property income)':
      return DividendTypeEnum.PROPERTY_INCOME;
    case 'Dividend (Property income)':
      return DividendTypeEnum.PROPERTY_INCOME;
    case 'Dividend (Bonus)':
      console.log(action);
      return DividendTypeEnum.BONUS;
    default:
      throw new Error('Dividend type unknow');
  }
}

export function convertToDividend(transaction: DataFromTrading212): Dividend {
  return {
    date: new Date(transaction.date),
    numberOfShares: +transaction.numberOfShares,
    pricePerShare: +transaction.pricePerShare,
    totalInEuro: +transaction.total,
    type: getTypeFromAction(transaction.action),
    withholdingTax: +transaction.withholdingTax,
    index: {
      id: transaction.isin,
      ticker: transaction.ticker,
      name: transaction.stockName,
      currency: transaction.currency,
      countryCode: transaction.isin.slice(0, 2),
    },
  };
}

export function convertToDividends(transactions: DataFromTrading212[]): Dividend[] {
  return transactions.map((transaction) => convertToDividend(transaction));
}
