import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Dividend } from '@/models/stock/dividend/dividend.entity';

@Injectable()
export class DividendService {
  constructor(
    @InjectRepository(Dividend)
    private dividendRepository: Repository<Dividend>,
  ) {}

  saveAll(dividends: Dividend[]) {
    return this.dividendRepository.save(dividends);
  }
}
