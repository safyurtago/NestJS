"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const machine_module_1 = require("./machine/models/machine.module");
const driver_module_1 = require("./driver/models/driver.module");
const builder_module_1 = require("./builder/models/builder.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const company_module_1 = require("./company/company.module");
const company_model_1 = require("./company/models/company.model");
const builder_module_2 = require("./builder/builder.module");
const machine_module_2 = require("./machine/machine.module");
const machine_driver_module_1 = require("./machine_driver/machine_driver.module");
const driver_module_2 = require("./driver/driver.module");
const { env } = process;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: env.POSTGRES_HOST || 'localhost',
                port: Number(env.POSTGRES_PORT) || 8090,
                username: env.POSTGRES_USER || 'postgres',
                password: env.POSTGRES_PASSWORD || 'admin',
                database: env.POSTGRES_DB_NAME || 'nest_one',
                models: [company_model_1.Company, builder_module_1.Builder, driver_module_1.Driver, machine_module_1.Machine],
                autoLoadModels: true,
                logging: true,
            }),
            company_module_1.CompanyModule,
            builder_module_2.BuilderModule,
            machine_module_2.MachineModule,
            machine_driver_module_1.MachineDriverModule,
            driver_module_2.DriverModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map