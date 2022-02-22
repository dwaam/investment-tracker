"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.StockIndexController = void 0;
var common_1 = require("@nestjs/common");
var StockIndexController = /** @class */ (function () {
    function StockIndexController(stockIndexService) {
        this.stockIndexService = stockIndexService;
    }
    StockIndexController.prototype.findAll = function () {
        return this.stockIndexService.findAll();
    };
    StockIndexController.prototype.update = function (updateStockIndexDto) {
        return this.stockIndexService.update(updateStockIndexDto);
    };
    __decorate([
        (0, common_1.Get)()
    ], StockIndexController.prototype, "findAll");
    __decorate([
        (0, common_1.Patch)(),
        __param(0, (0, common_1.Body)())
    ], StockIndexController.prototype, "update");
    StockIndexController = __decorate([
        (0, common_1.Controller)('stock-indexes')
    ], StockIndexController);
    return StockIndexController;
}());
exports.StockIndexController = StockIndexController;
