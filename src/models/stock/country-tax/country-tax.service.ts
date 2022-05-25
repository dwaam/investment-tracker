import { Injectable } from '@nestjs/common';

import { CountryTaxRepository } from '@/models/stock/country-tax/country-tax.repository';

@Injectable()
export class CountryTaxService {
  constructor(private countryTaxRepository: CountryTaxRepository) {}
}
