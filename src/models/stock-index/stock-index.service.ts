import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockIndex } from './stock-index.entity';

@Injectable()
export class StockIndexService {
  constructor(
    @InjectRepository(StockIndex)
    private stockIndexRepository: Repository<StockIndex>,
  ) {}

  async findAll(): Promise<StockIndex[]> {
    return this.stockIndexRepository.find();
  }
}
