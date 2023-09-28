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
exports.Machine = void 0;
const driver_module_1 = require("./../../driver/models/driver.module");
const machine_driver_module_1 = require("./../../machine_driver/models/machine-driver.module");
const company_model_1 = require("../../company/models/company.model");
const sequelize_typescript_1 = require("sequelize-typescript");
let Machine = class Machine extends sequelize_typescript_1.Model {
};
exports.Machine = Machine;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], Machine.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Machine.prototype, "model", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true
    }),
    __metadata("design:type", String)
], Machine.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => company_model_1.Company),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, onDelete: 'RESTRICT', onUpdate: 'CASCADE' }),
    __metadata("design:type", Number)
], Machine.prototype, "companyId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => company_model_1.Company),
    __metadata("design:type", company_model_1.Company)
], Machine.prototype, "company", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => driver_module_1.Driver, () => machine_driver_module_1.MachineDriver),
    __metadata("design:type", Array)
], Machine.prototype, "drivers", void 0);
exports.Machine = Machine = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "machine" })
], Machine);
//# sourceMappingURL=machine.module.js.map