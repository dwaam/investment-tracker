import { Injectable } from '@nestjs/common';

import { CountryTaxRepository } from '@/models/stock/country-tax/country-tax.repository';
import { CountryTax } from '@/models/stock/country-tax/country-tax.entity';
import { getLoggerFor } from '@/utils/logger.util';

@Injectable()
export class CountryTaxService {
  private readonly logger = getLoggerFor(CountryTaxService.name);

  constructor(private countryTaxRepository: CountryTaxRepository) {}

  async findAll(): Promise<CountryTax[]> {
    this.logger.info('Find all country taxes.');

    return this.countryTaxRepository.find();
  }

  async findByCountryCode(countryCode: string): Promise<CountryTax> {
    this.logger.info(`Find country with code "${countryCode}".`);

    return this.countryTaxRepository.findOneBy({ country: countryCode });
  }
}
