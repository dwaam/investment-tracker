import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { DividendRepository } from '@/models/stock/dividend/dividend.repository';

@Injectable()
export class DividendService {
  constructor(private dividendRepository: DividendRepository) {}

  saveAll(dividends: Dividend[]) {
    return this.dividendRepository.save(dividends);
  }

  getDividendByMonth() {
    return this.dividendRepository.getDividendByMonth();
  }

  getDividendPerYear(year: number) {
    return this.dividendRepository.getDividendsPerYear(year);
  }

  async getDividendPerYearByCountry(year: number) {
    const dividends: Dividend[] = await this.dividendRepository.getDividendsPerYear(year);

    return _.chain(dividends)
      .groupBy('index.country.country')
      .mapValues((listOfDividend) => this.getSummaryForDividendsFromSameCountry(listOfDividend))
      .value();
  }

  private getSummaryForDividendsFromSameCountry(listOfDividend: Dividend[]) {
    const country = listOfDividend[0].index.country;

    const totalNet = _.chain(listOfDividend).sumBy('totalInEuro').round(2);

    const totalBrut = _.round((totalNet * 100) / (100 - country.taxPercentage), 3);

    return {
      totalNet,
      totalBrut,
      payAsYouEarn: _.round(totalBrut - totalNet, 2),
      taxRateToApply: country.taxRateToApply,
    };
  }

  async getTaxFormInputForYear(year: number) {
    const dividendsPerCountry = await this.getDividendPerYearByCountry(year);

    // Calculate 2DC value
    let sumOfBrut = 0;
    _.forOwn(dividendsPerCountry, (countrySummary) => {
      sumOfBrut += countrySummary.totalBrut;
    });

    const frenchDividends = dividendsPerCountry['FR'];

    const form = [
      {
        formNumber: 2042,
        fields: [
          {
            field: '2DC',
            comment: 'REVENUS DES ACTIONS ET PARTS',
            value: _.round(sumOfBrut, 2),
          },
          {
            field: '2CG',
            comment: `REVENUS D'ACTIONS FRANCAISES`,
            value: _.round(frenchDividends?.totalBrut, 2) || 0,
          },
          {
            field: '2CK',
            comment: `IMPOTS DEJA PAYE SUR ACTIONS FRANCAISES`,
            value: frenchDividends ? _.round((frenchDividends.totalBrut * 12.8) / 100, 2) : 0,
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
