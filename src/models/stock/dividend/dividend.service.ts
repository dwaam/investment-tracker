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
      .mapValues((listOfDividend) => this.getSummaryForDividendsFromSameCountry(listOfDividend));
  }

  private getSummaryForDividendsFromSameCountry(listOfDividend: Dividend[]) {
    const country = listOfDividend[0].index.country;

    const totalNet = _.chain(listOfDividend).sumBy('totalInEuro').round(2);

    const totalBrut = _.round((totalNet * 100) / (100 - country.taxPercentage), 3);
    return {
      totalNet,
      totalBrut,
    };
  }
}
