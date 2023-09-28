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
exports.FuelTypeService = void 0;
const fuel_type_module_1 = require("./models/fuel-type.module");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
let FuelTypeService = class FuelTypeService {
    constructor(fuelTypeRepository) {
        this.fuelTypeRepository = fuelTypeRepository;
    }
    async create(createFuelTypeDto) {
        return this.fuelTypeRepository.create(createFuelTypeDto);
    }
    async getAll() {
        return this.fuelTypeRepository.findAll({ include: { all: true } });
    }
    async getById(id) {
        return this.fuelTypeRepository.findByPk(id, { include: { all: true } });
    }
    async deleteById(id) {
        return this.fuelTypeRepository.destroy({ where: { id } });
    }
    async updateById(id, updateFuelTypeDto) {
        return this.fuelTypeRepository.update(updateFuelTypeDto, { where: { id }, returning: true });
    }
};
exports.FuelTypeService = FuelTypeService;
exports.FuelTypeService = FuelTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(fuel_type_module_1.FuelType)),
    __metadata("design:paramtypes", [Object])
], FuelTypeService);
//# sourceMappingURL=fuel-type.service.js.map