"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasStationModule = void 0;
const gas_station_module_1 = require("./models/gas-station.module");
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const gas_station_controller_1 = require("./gas-station.controller");
const gas_station_service_1 = require("./gas-station.service");
let GasStationModule = class GasStationModule {
};
exports.GasStationModule = GasStationModule;
exports.GasStationModule = GasStationModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([gas_station_module_1.GasStation]),],
        controllers: [gas_station_controller_1.GasStationController],
        providers: [gas_station_service_1.GasStationService]
    })
], GasStationModule);
//# sourceMappingURL=gas-station.module.js.map