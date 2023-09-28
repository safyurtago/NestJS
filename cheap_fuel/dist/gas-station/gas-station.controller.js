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
exports.GasStationController = void 0;
const update_gas_station_dto_1 = require("./dto/update.gas-station.dto");
const create_gas_station_dto_1 = require("./dto/create.gas-station.dto");
const gas_station_service_1 = require("./gas-station.service");
const common_1 = require("@nestjs/common");
let GasStationController = class GasStationController {
    constructor(gasStationService) {
        this.gasStationService = gasStationService;
    }
    async createGasStaion(createGasStaionDto) {
        return this.gasStationService.createGasStation(createGasStaionDto);
    }
    async getAllGasStaion() {
        return this.gasStationService.getAllGasStation();
    }
    async getOneGasStation(id) {
        return this.gasStationService.getOneGasStation(id);
    }
    async deleteGasStation(id) {
        return this.gasStationService.deleteGasStation(id);
    }
    async updateGasStation(id, updateGasStationDto) {
        return this.gasStationService.updateGasStation(id, updateGasStationDto);
    }
};
exports.GasStationController = GasStationController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gas_station_dto_1.CreateGasStationDto]),
    __metadata("design:returntype", Promise)
], GasStationController.prototype, "createGasStaion", null);
__decorate([
    (0, common_1.Get)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GasStationController.prototype, "getAllGasStaion", null);
__decorate([
    (0, common_1.Get)('getall/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GasStationController.prototype, "getOneGasStation", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GasStationController.prototype, "deleteGasStation", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_gas_station_dto_1.UpdateGasStationDto]),
    __metadata("design:returntype", Promise)
], GasStationController.prototype, "updateGasStation", null);
exports.GasStationController = GasStationController = __decorate([
    (0, common_1.Controller)('gas-station'),
    __metadata("design:paramtypes", [gas_station_service_1.GasStationService])
], GasStationController);
//# sourceMappingURL=gas-station.controller.js.map