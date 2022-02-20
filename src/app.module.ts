import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockIndexModule } from './models/stock-index/stock-index.module';
import { StockIndex } from './models/stock-index/stock-index.entity';

@Module({
  imports: [
    StockIndexModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 55432,
      username: 'admin',
      password: 'admin-local',
      database: 'investment-tracker',
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      entities: [StockIndex],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
