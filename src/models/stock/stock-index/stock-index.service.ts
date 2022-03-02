import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { UpdateStockIndexDto } from '@/models/stock/stock-index/dto/update-stock-index.dto';

@Injectable()
export class StockIndexService {
  constructor(
    @InjectRepository(StockIndex)
    private stockIndexRepository: Repository<StockIndex>,
  ) {}

  async findAll(): Promise<StockIndex[]> {
    return this.stockIndexRepository.find();
  }

  async update(updateStockIndexDto: UpdateStockIndexDto) {
    return this.stockIndexRepository.update(updateStockIndexDto.id, updateStockIndexDto);
  }
}
