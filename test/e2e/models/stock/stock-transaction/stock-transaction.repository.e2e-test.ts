import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';

import { StockModule } from '@/models/stock/stock.module';
import { StockTransactionRepository } from '@/models/stock/stock-transaction/stock-transaction.repository';

import { config } from '#/e2e/ormconfig-e2e';

describe('stock-transaction.repository', () => {
  let app: INestApplication;
  let repository: StockTransactionRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [StockModule, TypeOrmModule.forRoot(config)],
    }).compile();

    app = module.createNestApplication();

    await app.init();

    repository = module.get('StockTransactionRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should do something.', async () => {
    const toto = await repository.find();

    console.log(toto);
  });
});
