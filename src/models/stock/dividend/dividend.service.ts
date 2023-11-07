import { Injectable } from '@nestjs/common';
import { chain, forOwn, round } from 'lodash';
import { Dictionary } from 'express-serve-static-core';

import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { DividendRepository } from '@/models/stock/dividend/dividend.repository';
import { InvestedAmountsByMonthRaw } from '@/models/stock/stock.interface';
import {
  SummaryForDividendsFromSameCountry,
  TaxForm,
  UpsertDividend,
} from '@/models/stock/dividend/dividend.interfaces';
import { getLoggerFor } from '@/utils/logger.util';

@Injectable()
export class DividendService {
  private readonly logger = getLoggerFor(DividendService.name);

  constructor(private dividendRepository: DividendRepository) {}

  async saveAll(dividends: Dividend[]): Promise<Dividend[]> {
    this.logger.info(`Saving ${dividends.length} dividends.`);

    return this.dividendRepository.save(dividends);
  }

  async upsertMany(dividends: UpsertDividend[]): Promise<void> {
    this.logger.info(`Upserting ${dividends.length} dividends.`);

    return this.dividendRepository.upsertMany(dividends);
  }

  async getDividendByMonth(): Promise<InvestedAmountsByMonthRaw[]> {
    return this.dividendRepository.getDividendByMonth();
  }

  async getDividendPerYear(year: number): Promise<Dividend[]> {
    return this.dividendRepository.getDividendsPerYear(year);
  }

  async getDividendPerYearByCountry(year: number): Promise<Dictionary<SummaryForDividendsFromSameCountry>> {
    const dividends: Dividend[] = await this.dividendRepository.getDividendsPerYear(year);

    return chain(dividends)
      .groupBy('index.country.country')
      .mapValues((listOfDividend) => this.getSummaryForDividendsFromSameCountry(listOfDividend))
      .value();
  }

  private getSummaryForDividendsFromSameCountry(listOfDividend: Dividend[]): SummaryForDividendsFromSameCountry {
    const country = listOfDividend[0].index.country;

    const totalNet = chain(listOfDividend).sumBy('totalInEuro').round(2).value();

    const totalBrut = round((totalNet * 100) / (100 - country.taxPercentage), 3);

    return {
      totalNet,
      totalBrut,
      payAsYouEarn: round(totalBrut - totalNet, 2),
      taxRateToApply: country.taxRateToApply,
    };
  }

  async getTaxFormInputForYear(year: number): Promise<TaxForm[]> {
    const dividendsPerCountry = await this.getDividendPerYearByCountry(year);

    // Calculate 2DC value
    let sumOfBrut = 0;
    forOwn(dividendsPerCountry, (countrySummary) => {
      sumOfBrut += countrySummary.totalBrut;
    });

    const frenchDividends = dividendsPerCountry['FR'];

    const form: TaxForm[] = [
      {
        formNumber: 2042,
        fields: [
          {
            field: '2DC',
            comment: 'REVENUS DES ACTIONS ET PARTS',
            value: round(sumOfBrut, 2),
          },
          {
            field: '2CG',
            comment: `REVENUS D'ACTIONS FRANCAISES`,
            value: round(frenchDividends?.totalBrut, 2) || 0,
          },
          {
            field: '2CK',
            comment: `IMPOTS DEJA PAYE SUR ACTIONS FRANCAISES`,
            value: frenchDividends ? round((frenchDividends.totalBrut * 12.8) / 100, 2) : 0,
          },
        ],
      },
      {
        formNumber: 2047,
        dividendsByCountry: dividendsPerCountry,
      },
    ];

    return form;
  }
}
