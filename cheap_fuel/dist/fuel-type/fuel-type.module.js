"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelTypeModule = void 0;
const fuel_type_module_1 = require("./models/fuel-type.module");
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const fuel_type_controller_1 = require("./fuel-type.controller");
const fuel_type_service_1 = require("./fuel-type.service");
let FuelTypeModule = class FuelTypeModule {
};
exports.FuelTypeModule = FuelTypeModule;
exports.FuelTypeModule = FuelTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([fuel_type_module_1.FuelType])],
        controllers: [fuel_type_controller_1.FuelTypeController],
        providers: [fuel_type_service_1.FuelTypeService]
    })
], FuelTypeModule);
//# sourceMappingURL=fuel-type.module.js.map