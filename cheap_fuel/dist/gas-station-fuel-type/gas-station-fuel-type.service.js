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
exports.GasStationFuelTypeService = void 0;
const gas_station_fuel_type_module_1 = require("./models/gas-station-fuel-type.module");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
let GasStationFuelTypeService = class GasStationFuelTypeService {
    constructor(gasStationFuelTypeRepository) {
        this.gasStationFuelTypeRepository = gasStationFuelTypeRepository;
    }
    async createGasStationFuelType(createGasStationFuelTypeDto) {
        return this.gasStationFuelTypeRepository.create(createGasStationFuelTypeDto);
    }
    async getAllGasStationFuelTypes() {
        return this.gasStationFuelTypeRepository.findAll({ include: { all: true } });
    }
    async getOneGasStationFuelType(id) {
        return this.gasStationFuelTypeRepository.findByPk(id, { include: { all: true } });
    }
    async deleteOneGasStationFuelType(id) {
        return this.gasStationFuelTypeRepository.destroy({ where: { id } });
    }
    async updateGasStationFuelType(id, updateGasStationFuelTypeDto) {
        return this.gasStationFuelTypeRepository.update(updateGasStationFuelTypeDto, { where: { id }, returning: true });
    }
};
exports.GasStationFuelTypeService = GasStationFuelTypeService;
exports.GasStationFuelTypeService = GasStationFuelTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(gas_station_fuel_type_module_1.GasStationFuelType)),
    __metadata("design:paramtypes", [Object])
], GasStationFuelTypeService);
//# sourceMappingURL=gas-station-fuel-type.service.js.map