import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { TRANSACTION_TYPE_LINK } from '@/models/asset/stock-integration/stock-integration.constant';
import { DataFromTrading212 } from '@/models/asset/asset.interface';

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
    },
  };
}

export function convertToStockTransactions(transactions: DataFromTrading212[]): StockTransaction[] {
  return transactions.map((transaction) => convertToStockTransaction(transaction));
}
