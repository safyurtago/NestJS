"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const gas_station_fuel_type_module_1 = require("./gas-station-fuel-type/models/gas-station-fuel-type.module");
const gas_station_branch_module_1 = require("./gas-station-branch/models/gas-station-branch.module");
const fuel_type_module_1 = require("./fuel-type/models/fuel-type.module");
const gas_station_module_1 = require("./gas-station/models/gas-station.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const gas_station_module_2 = require("./gas-station/gas-station.module");
const gas_station_branch_module_2 = require("./gas-station-branch/gas-station-branch.module");
const gas_station_fuel_type_module_2 = require("./gas-station-fuel-type/gas-station-fuel-type.module");
const fuel_type_module_2 = require("./fuel-type/fuel-type.module");
const { env } = process;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                port: Number(env.DB_PORT),
                host: env.DB_HOST,
                username: env.DB_USER,
                password: env.DB_PASSWORD,
                database: env.DB_NAME,
                models: [gas_station_module_1.GasStation, gas_station_branch_module_1.GasStationBranch, gas_station_fuel_type_module_1.GasStationFuelType, fuel_type_module_1.FuelType],
                autoLoadModels: true,
                logging: true
            }),
            gas_station_module_2.GasStationModule,
            gas_station_branch_module_2.GasStationBranchModule,
            gas_station_fuel_type_module_2.GasStationFuelTypeModule,
            fuel_type_module_2.FuelTypeModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map