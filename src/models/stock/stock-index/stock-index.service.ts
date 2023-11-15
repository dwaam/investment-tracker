import { Injectable } from '@nestjs/common';

import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { UpdateStockIndexDto } from '@/models/stock/stock-index/dto/update-stock-index.dto';
import { getLoggerFor } from '@/utils/logger.util';
import { StockIndexRepository } from '@/models/stock/stock-index/stock-index.repository';

@Injectable()
export class StockIndexService {
  private readonly logger = getLoggerFor(StockIndexService.name);

  constructor(private stockIndexRepository: StockIndexRepository) {}

  async findAll(): Promise<StockIndex[]> {
    this.logger.info(`Find all stock indices.`);

    return this.stockIndexRepository.find();
  }

  async patch(stockIndexId: string, updateStockIndexDto: UpdateStockIndexDto): Promise<StockIndex> {
    this.logger.info(`Updating index with ISIN ${stockIndexId}.`);

    await this.stockIndexRepository.update(stockIndexId, updateStockIndexDto);

    return this.stockIndexRepository.findOneBy({ id: stockIndexId });
  }

  async upsertMany(stockIndices: StockIndex[]): Promise<void> {
    this.logger.info(`Upserting ${stockIndices.length} stock indices.`);

    return this.stockIndexRepository.upsertMany(stockIndices);
  }
}
