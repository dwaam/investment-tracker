import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockTransaction } from './stock-transaction.entity';

@Injectable()
export class StockTransactionService {
  constructor(
    @InjectRepository(StockTransaction)
    private stockTransactionRepository: Repository<StockTransaction>,
  ) {}

  saveOne(stockTransaction: StockTransaction) {
    return this.stockTransactionRepository.save(stockTransaction);
  }

  saveAll(stockTransactions: StockTransaction[]) {
    return this.stockTransactionRepository.save(stockTransactions);
  }
}
