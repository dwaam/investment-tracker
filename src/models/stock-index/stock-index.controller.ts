import { Controller, Get } from '@nestjs/common';
import { StockIndexService } from './stock-index.service';
import { StockIndex } from './stock-index.entity';

@Controller('stock-indexes')
export class StockIndexController {
  constructor(private stockIndexService: StockIndexService) {}

  @Get()
  findAll(): Promise<StockIndex[]> {
    return this.stockIndexService.findAll();
  }
}
