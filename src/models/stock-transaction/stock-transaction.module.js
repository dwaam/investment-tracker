"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StockTransactionModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var stock_transaction_controller_1 = require("./stock-transaction.controller");
var stock_transaction_entity_1 = require("./stock-transaction.entity");
var stock_transaction_service_1 = require("./stock-transaction.service");
var StockTransactionModule = /** @class */ (function () {
    function StockTransactionModule() {
    }
    StockTransactionModule = __decorate([
        (0, common_1.Module)({
            controllers: [stock_transaction_controller_1.StockTransactionController],
            imports: [typeorm_1.TypeOrmModule.forFeature([stock_transaction_entity_1.StockTransaction])],
            providers: [stock_transaction_service_1.StockTransactionService]
        })
    ], StockTransactionModule);
    return StockTransactionModule;
}());
exports.StockTransactionModule = StockTransactionModule;
