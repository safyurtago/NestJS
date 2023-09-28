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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasStationFuelType = void 0;
const gas_station_branch_module_1 = require("./../../gas-station-branch/models/gas-station-branch.module");
const fuel_type_module_1 = require("./../../fuel-type/models/fuel-type.module");
const sequelize_typescript_1 = require("sequelize-typescript");
let GasStationFuelType = class GasStationFuelType extends sequelize_typescript_1.Model {
};
exports.GasStationFuelType = GasStationFuelType;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], GasStationFuelType.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => gas_station_branch_module_1.GasStationBranch),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], GasStationFuelType.prototype, "gas_station_branch_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => fuel_type_module_1.FuelType),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], GasStationFuelType.prototype, "fuel_type_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], GasStationFuelType.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
    }),
    __metadata("design:type", Boolean)
], GasStationFuelType.prototype, "isActive", void 0);
exports.GasStationFuelType = GasStationFuelType = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'gas_station_fuel_type' })
], GasStationFuelType);
//# sourceMappingURL=gas-station-fuel-type.module.js.map