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
exports.GasStationService = void 0;
const gas_station_module_1 = require("./models/gas-station.module");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
let GasStationService = class GasStationService {
    constructor(gasStationRepository) {
        this.gasStationRepository = gasStationRepository;
    }
    async createGasStation(createGasStationDto) {
        return this.gasStationRepository.create(createGasStationDto);
    }
    async getAllGasStation() {
        return this.gasStationRepository.findAll({
            include: { all: true }
        });
    }
    async getOneGasStation(id) {
        return this.gasStationRepository.findByPk(id, { include: { all: true } });
    }
    async deleteGasStation(id) {
        return this.gasStationRepository.destroy({ where: { id } });
    }
    async updateGasStation(id, updateGasStationDto) {
        return this.gasStationRepository.update(updateGasStationDto, { where: { id }, returning: true });
    }
};
exports.GasStationService = GasStationService;
exports.GasStationService = GasStationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(gas_station_module_1.GasStation)),
    __metadata("design:paramtypes", [Object])
], GasStationService);
//# sourceMappingURL=gas-station.service.js.map