"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelTypeController = void 0;
const update_fuel_type_dto_1 = require("./dto/update.fuel-type.dto");
const create_fuel_type_dto_1 = require("./dto/create.fuel-type.dto");
const fuel_type_service_1 = require("./fuel-type.service");
const common_1 = require("@nestjs/common");
let FuelTypeController = class FuelTypeController {
    constructor(fuelTypeService) {
        this.fuelTypeService = fuelTypeService;
    }
    async create(createFuelTypeDto) {
        return this.fuelTypeService.create(createFuelTypeDto);
    }
    async getAll() {
        return this.fuelTypeService.getAll();
    }
    async getOneByID(id) {
        return this.fuelTypeService.getById(id);
    }
    async deleteById(id) {
        return this.fuelTypeService.deleteById(id);
    }
    async update(id, updateFuelTypeDto) {
        return this.fuelTypeService.updateById(id, updateFuelTypeDto);
    }
};
exports.FuelTypeController = FuelTypeController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fuel_type_dto_1.CreateFuelTypeDto]),
    __metadata("design:returntype", Promise)
], FuelTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FuelTypeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('getall/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FuelTypeController.prototype, "getOneByID", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FuelTypeController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_fuel_type_dto_1.UpdateFuelTypeDto]),
    __metadata("design:returntype", Promise)
], FuelTypeController.prototype, "update", null);
exports.FuelTypeController = FuelTypeController = __decorate([
    (0, common_1.Controller)('fuel-type'),
    __metadata("design:paramtypes", [fuel_type_service_1.FuelTypeService])
], FuelTypeController);
//# sourceMappingURL=fuel-type.controller.js.map