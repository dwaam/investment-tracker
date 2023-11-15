import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { StockIndexService } from '@/models/stock/stock-index/stock-index.service';
import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { UpdateStockIndexDto } from '@/models/stock/stock-index/dto/update-stock-index.dto';

@Controller('stocks/stock-indices')
export class StockIndexController {
  constructor(private stockIndexService: StockIndexService) {}

  @Get()
  async findAll(): Promise<StockIndex[]> {
    return this.stockIndexService.findAll();
  }

  @Patch('/:stockIndexId')
  async update(
    @Param('stockIndexId') stockIndexId: string,
    @Body() updateStockIndexDto: UpdateStockIndexDto,
  ): Promise<StockIndex> {
    return this.stockIndexService.patch(stockIndexId, updateStockIndexDto);
  }
}
