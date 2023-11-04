import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

import { StockIndexService } from '@/models/stock/stock-index/stock-index.service';
import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { UpdateStockIndexDto } from '@/models/stock/stock-index/dto/update-stock-index.dto';

@Controller('stocks/stock-indexes')
export class StockIndexController {
  constructor(private stockIndexService: StockIndexService) {}

  @Get()
  async findAll(): Promise<StockIndex[]> {
    return this.stockIndexService.findAll();
  }

  @Patch()
  async update(@Body() updateStockIndexDto: UpdateStockIndexDto): Promise<UpdateResult> {
    return this.stockIndexService.update(updateStockIndexDto);
  }
}
