import { TransactionTypeEnum } from '@/models/stock/stock-transaction/stock-transaction.enum';

export const TRADING_212_COLUMN_NAMES = [
  'action',
  'date',
  'isin',
  'ticker',
  'stockName',
  'numberOfShares',
  'pricePerShare',
  'currency',
  'exchangeRate',
  'resultInEuro',
  'total',
  'withholdingTax',
  'withholdingTaxCurrency',
  'chargeAmountInEuro',
  'stampDutyReserveTaxInEuro',
  'notes',
  'transactionId',
  'currencyConversionFeeInEuro',
  'frenchTransactionTax',
];

export const TRANSACTION_TYPE_LINK = {
  'Market buy': TransactionTypeEnum.BUY,
  'Market sell': TransactionTypeEnum.SELL,
};
