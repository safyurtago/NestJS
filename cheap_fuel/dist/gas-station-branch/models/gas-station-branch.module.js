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
exports.GasStationBranch = void 0;
const gas_station_module_1 = require("./../../gas-station/models/gas-station.module");
const sequelize_typescript_1 = require("sequelize-typescript");
let GasStationBranch = class GasStationBranch extends sequelize_typescript_1.Model {
};
exports.GasStationBranch = GasStationBranch;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], GasStationBranch.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => gas_station_module_1.GasStation),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], GasStationBranch.prototype, "gas_sation_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => gas_station_module_1.GasStation),
    __metadata("design:type", Array)
], GasStationBranch.prototype, "gasStations", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], GasStationBranch.prototype, "branch_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], GasStationBranch.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], GasStationBranch.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], GasStationBranch.prototype, "phone", void 0);
exports.GasStationBranch = GasStationBranch = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "gas_station_branch" })
], GasStationBranch);
//# sourceMappingURL=gas-station-branch.module.js.map