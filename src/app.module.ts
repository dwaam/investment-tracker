import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AssetModule } from '@/models/asset/asset.module';
import { StockModule } from '@/models/stock/stock.module';
import { createConfig } from '@/config/database/ormconfig';
import { StockIndexModule } from '@/models/stock/stock-index/stock-index.module';
import { CountryTaxModule } from '@/models/stock/country-tax/country-tax.module';
import { UserModule } from '@/models/user/user.module';
import { AuthModule } from '@/auth/auth.module';
import { CallerHeaderMiddleware } from '@/auth/middlewares/caller-header.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    StockModule,
    AssetModule,
    StockIndexModule,
    CountryTaxModule,
    TypeOrmModule.forRoot(createConfig()),
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CallerHeaderMiddleware).exclude({ path: 'auth/login', method: RequestMethod.POST }).forRoutes('*');
  }
}
