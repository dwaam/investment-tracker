import { Repository } from 'typeorm';

import { CountryTax } from '@/models/stock/country-tax/country-tax.entity';
import { CustomRepository } from '@/config/database/toDelete/typeorm-ex.decorator';

@CustomRepository(CountryTax)
export class CountryTaxRepository extends Repository<CountryTax> {}
