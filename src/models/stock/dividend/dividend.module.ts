import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { DividendService } from '@/models/stock/dividend/dividend.service';
import { DividendRepository } from '@/models/stock/dividend/dividend.repository';
import { DividendController } from '@/models/stock/dividend/dividend.controller';
import { TypeOrmExModule } from '@/config/database/toDelete/typeorm-ex.module';

@Module({
  controllers: [DividendController],
  imports: [TypeOrmModule.forFeature([Dividend]), TypeOrmExModule.forCustomRepository([DividendRepository])],
  providers: [DividendService],
  exports: [DividendService],
})
export class DividendModule {}
