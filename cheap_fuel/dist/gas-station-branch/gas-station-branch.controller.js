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
exports.GasStationBranchController = void 0;
const update_gas_station_branch_dto_1 = require("./dto/update.gas-station-branch.dto");
const create_gas_station_branch_dto_1 = require("./dto/create.gas-station-branch.dto");
const gas_station_branch_service_1 = require("./gas-station-branch.service");
const common_1 = require("@nestjs/common");
let GasStationBranchController = class GasStationBranchController {
    constructor(gasStationBranchService) {
        this.gasStationBranchService = gasStationBranchService;
    }
    async create(createGasStationBranchDto) {
        return this.gasStationBranchService.cerateGasStationBranch(createGasStationBranchDto);
    }
    async getAll() {
        return this.gasStationBranchService.getAllGasStationBranch();
    }
    async getByID(id) {
        return this.gasStationBranchService.getOneGasStationBranch(id);
    }
    async deleteByID(id) {
        return this.gasStationBranchService.deleteGasStationBranch(id);
    }
    async updateByID(id, updateGasStationBranchDto) {
        return this.gasStationBranchService.updateGasStation(id, updateGasStationBranchDto);
    }
};
exports.GasStationBranchController = GasStationBranchController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gas_station_branch_dto_1.CreateGasStationBranchDto]),
    __metadata("design:returntype", Promise)
], GasStationBranchController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GasStationBranchController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('getall/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GasStationBranchController.prototype, "getByID", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GasStationBranchController.prototype, "deleteByID", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_gas_station_branch_dto_1.UpdateGasStationBranchDto]),
    __metadata("design:returntype", Promise)
], GasStationBranchController.prototype, "updateByID", null);
exports.GasStationBranchController = GasStationBranchController = __decorate([
    (0, common_1.Controller)('gas-station-branch'),
    __metadata("design:paramtypes", [gas_station_branch_service_1.GasStationBranchService])
], GasStationBranchController);
//# sourceMappingURL=gas-station-branch.controller.js.map