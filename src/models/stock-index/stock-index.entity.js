"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StockIndex = void 0;
var typeorm_1 = require("typeorm");
var stock_index_enum_1 = require("@/models/stock-index/stock-index.enum");
var StockIndex = /** @class */ (function () {
    function StockIndex() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({ name: 'isin' })
    ], StockIndex.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ name: 'ticker' })
    ], StockIndex.prototype, "ticker");
    __decorate([
        (0, typeorm_1.Column)({ name: 'name' })
    ], StockIndex.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ name: 'currency' })
    ], StockIndex.prototype, "currency");
    __decorate([
        (0, typeorm_1.Column)({
            name: 'category',
            nullable: true,
            type: 'enum',
            "enum": stock_index_enum_1.StockCategory
        })
    ], StockIndex.prototype, "category");
    StockIndex = __decorate([
        (0, typeorm_1.Entity)('stock_indexes')
    ], StockIndex);
    return StockIndex;
}());
exports.StockIndex = StockIndex;
