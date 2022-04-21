import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { DividendService } from '@/models/stock/dividend/dividend.service';
import { DividendRepository } from '@/models/stock/dividend/dividend.repository';
import { DividendController } from '@/models/stock/dividend/dividend.controller';

@Module({
  controllers: [DividendController],
  imports: [TypeOrmModule.forFeature([DividendRepository, Dividend])],
  providers: [DividendService],
  exports: [DividendService],
})
export class DividendModule {}
