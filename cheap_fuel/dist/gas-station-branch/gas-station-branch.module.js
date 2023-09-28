"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasStationBranchModule = void 0;
const gas_station_branch_module_1 = require("./models/gas-station-branch.module");
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const gas_station_branch_controller_1 = require("./gas-station-branch.controller");
const gas_station_branch_service_1 = require("./gas-station-branch.service");
let GasStationBranchModule = class GasStationBranchModule {
};
exports.GasStationBranchModule = GasStationBranchModule;
exports.GasStationBranchModule = GasStationBranchModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([gas_station_branch_module_1.GasStationBranch])],
        controllers: [gas_station_branch_controller_1.GasStationBranchController],
        providers: [gas_station_branch_service_1.GasStationBranchService]
    })
], GasStationBranchModule);
//# sourceMappingURL=gas-station-branch.module.js.map