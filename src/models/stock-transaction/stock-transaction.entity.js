"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StockTransaction = void 0;
var typeorm_1 = require("typeorm");
var stock_index_entity_1 = require("@/models/stock-index/stock-index.entity");
var StockTransaction = /** @class */ (function () {
    function StockTransaction() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({ name: 'id' })
    ], StockTransaction.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ name: 'date', type: 'date' })
    ], StockTransaction.prototype, "date");
    __decorate([
        (0, typeorm_1.Column)({ name: 'action' })
    ], StockTransaction.prototype, "action");
    __decorate([
        (0, typeorm_1.Column)({ name: 'number_of_shares' })
    ], StockTransaction.prototype, "numberOfShares");
    __decorate([
        (0, typeorm_1.Column)({ name: 'price_per_share' })
    ], StockTransaction.prototype, "pricePerShare");
    __decorate([
        (0, typeorm_1.Column)({ name: 'exchange_rate' })
    ], StockTransaction.prototype, "exchangeRate");
    __decorate([
        (0, typeorm_1.Column)({ name: 'total_in_euro' })
    ], StockTransaction.prototype, "totalInEuro");
    __decorate([
        (0, typeorm_1.Column)({ name: 'currency_conversion_fee' })
    ], StockTransaction.prototype, "currencyConversionFee");
    __decorate([
        (0, typeorm_1.JoinColumn)({ name: 'index_id' }),
        (0, typeorm_1.ManyToOne)(function () { return stock_index_entity_1.StockIndex; }, function (index) { return index.id; }, { cascade: ['insert', 'update'] })
    ], StockTransaction.prototype, "index");
    StockTransaction = __decorate([
        (0, typeorm_1.Entity)('stock_transactions')
    ], StockTransaction);
    return StockTransaction;
}());
exports.StockTransaction = StockTransaction;
