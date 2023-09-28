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
exports.GasStationFuelTypeController = void 0;
const update_gas_station_fuel_type_dto_1 = require("./dto/update.gas-station-fuel-type.dto");
const create_gas_station_fuel_type_dto_1 = require("./dto/create.gas-station-fuel-type.dto");
const gas_station_fuel_type_service_1 = require("./gas-station-fuel-type.service");
const common_1 = require("@nestjs/common");
let GasStationFuelTypeController = class GasStationFuelTypeController {
    constructor(gasStationFuelTypeService) {
        this.gasStationFuelTypeService = gasStationFuelTypeService;
    }
    async create(createGasStationFuelTypeDto) {
        return this.gasStationFuelTypeService.createGasStationFuelType(createGasStationFuelTypeDto);
    }
    async getAll() {
        return this.gasStationFuelTypeService.getAllGasStationFuelTypes();
    }
    async getById(id) {
        return this.gasStationFuelTypeService.getOneGasStationFuelType(id);
    }
    async delete(id) {
        return this.gasStationFuelTypeService.deleteOneGasStationFuelType(id);
    }
    async update(id, updateGasStationFuelTypeDto) {
        return this.gasStationFuelTypeService.updateGasStationFuelType(id, updateGasStationFuelTypeDto);
    }
};
exports.GasStationFuelTypeController = GasStationFuelTypeController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gas_station_fuel_type_dto_1.CreateGasStationFuelTypeDto]),
    __metadata("design:returntype", Promise)
], GasStationFuelTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GasStationFuelTypeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('getall/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GasStationFuelTypeController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GasStationFuelTypeController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_gas_station_fuel_type_dto_1.UpdateGasStationFuelTypeDto]),
    __metadata("design:returntype", Promise)
], GasStationFuelTypeController.prototype, "update", null);
exports.GasStationFuelTypeController = GasStationFuelTypeController = __decorate([
    (0, common_1.Controller)('gas-station-fuel-type'),
    __metadata("design:paramtypes", [gas_station_fuel_type_service_1.GasStationFuelTypeService])
], GasStationFuelTypeController);
//# sourceMappingURL=gas-station-fuel-type.controller.js.map