"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasStationFuelTypeModule = void 0;
const gas_station_fuel_type_module_1 = require("./models/gas-station-fuel-type.module");
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const gas_station_fuel_type_controller_1 = require("./gas-station-fuel-type.controller");
const gas_station_fuel_type_service_1 = require("./gas-station-fuel-type.service");
let GasStationFuelTypeModule = class GasStationFuelTypeModule {
};
exports.GasStationFuelTypeModule = GasStationFuelTypeModule;
exports.GasStationFuelTypeModule = GasStationFuelTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([gas_station_fuel_type_module_1.GasStationFuelType])],
        controllers: [gas_station_fuel_type_controller_1.GasStationFuelTypeController],
        providers: [gas_station_fuel_type_service_1.GasStationFuelTypeService]
    })
], GasStationFuelTypeModule);
//# sourceMappingURL=gas-station-fuel-type.module.js.map