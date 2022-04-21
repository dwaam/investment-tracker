import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { DividendService } from '@/models/stock/dividend/dividend.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dividend])],
  providers: [DividendService],
  exports: [DividendService],
})
export class DividendModule {}
