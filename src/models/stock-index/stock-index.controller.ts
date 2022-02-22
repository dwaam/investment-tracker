import { Body, Controller, Get, Patch } from '@nestjs/common';

import { StockIndexService } from '@/models/stock-index/stock-index.service';
import { StockIndex } from '@/models/stock-index/stock-index.entity';
import { UpdateStockIndexDto } from '@/models/stock-index/dto/update-stock-index.dto';

@Controller('stock-indexes')
export class StockIndexController {
  constructor(private stockIndexService: StockIndexService) {}

  @Get()
  findAll(): Promise<StockIndex[]> {
    return this.stockIndexService.findAll();
  }

  @Patch()
  update(@Body() updateStockIndexDto: UpdateStockIndexDto) {
    return this.stockIndexService.update(updateStockIndexDto);
  }
}
