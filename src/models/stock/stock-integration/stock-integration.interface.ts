export interface DataFromTrading212 {
  action: string;
  date: string;
  isin: string;
  ticker: string;
  stockName: string;
  numberOfShares: string;
  pricePerShare: string;
  currency: string;
  exchangeRate: string;
  resultInEuro: string;
  total: string;
  withholdingTax: string;
  withholdingTaxCurrency: string;
  chargeAmountInEuro: string;
  stampDutyReserveTaxInEuro: string;
  notes: string;
  transactionId: string;
  currencyConversionFeeInEuro: string;
  frenchTransactionTax: string;
}
