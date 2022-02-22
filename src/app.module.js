"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var stock_index_module_1 = require("@/models/stock-index/stock-index.module");
var stock_index_entity_1 = require("@/models/stock-index/stock-index.entity");
var stock_transaction_entity_1 = require("@/models/stock-transaction/stock-transaction.entity");
var stock_transaction_module_1 = require("@/models/stock-transaction/stock-transaction.module");
var asset_module_1 = require("@/models/asset/asset.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                stock_index_module_1.StockIndexModule,
                stock_transaction_module_1.StockTransactionModule,
                asset_module_1.AssetModule,
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 55432,
                    username: 'admin',
                    password: 'admin-local',
                    database: 'investment-tracker',
                    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    entities: [stock_index_entity_1.StockIndex, stock_transaction_entity_1.StockTransaction],
                    synchronize: true
                }),
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
