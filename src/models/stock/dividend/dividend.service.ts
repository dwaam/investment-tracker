import { Injectable } from '@nestjs/common';

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
}
