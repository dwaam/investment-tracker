import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountryTaxController } from '@/models/stock/country-tax/country-tax.controller';
import { CountryTaxRepository } from '@/models/stock/country-tax/country-tax.repository';
import { CountryTax } from '@/models/stock/country-tax/country-tax.entity';
import { CountryTaxService } from '@/models/stock/country-tax/country-tax.service';
import { TypeOrmExModule } from '@/config/database/toDelete/typeorm-ex.module';

@Module({
  controllers: [CountryTaxController],
  imports: [TypeOrmModule.forFeature([CountryTax]), TypeOrmExModule.forCustomRepository([CountryTaxRepository])],
  providers: [CountryTaxService],
})
export class CountryTaxModule {}
