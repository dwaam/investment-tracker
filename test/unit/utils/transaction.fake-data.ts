import { DataFromTrading212 } from '@/models/asset/asset.interface';
import { StockTransaction } from '@/models/stock-transaction/stock-transaction.entity';
import { TransactionTypeEnum } from '@/models/stock-transaction/stock-transaction.enum';

const transactionId = 'R2D2';
const tickerId = 'C3PO';
const ticker = 'MMM';
const stockName = '3M';
const currency = 'EUR';
const dateInString = '2020-01-01';
const currencyConversionFeeInEuro = '123';
const exchangeRate = '0.88';
const numberOfShares = '19';
const pricePerShare = '1223';
const totalInEuro = '987';

export const defaultDataFromTrading212: DataFromTrading212 = {
  transactionId,
  ticker,
  currency,
  currencyConversionFeeInEuro,
  action: 'Market buy',
  date: dateInString,
  exchangeRate,
  stockName,
  isin: tickerId,
  numberOfShares,
  pricePerShare,
  total: totalInEuro,
  chargeAmountInEuro: '',
  frenchTransactionTax: '',
  notes: '',
  resultInEuro: '',
  stampDutyReserveTaxInEuro: '',
  withholdingTax: '',
  withholdingTaxCurrency: '',
};

export const defaultStockTransaction: StockTransaction = {
  id: transactionId,
  action: TransactionTypeEnum.BUY,
  currencyConversionFee: +currencyConversionFeeInEuro,
  date: new Date(dateInString),
  exchangeRate: +exchangeRate,
  numberOfShares: +numberOfShares,
  pricePerShare: +pricePerShare,
  totalInEuro: +totalInEuro,
  index: {
    ticker,
    currency,
    id: tickerId,
    name: stockName,
  },
};
