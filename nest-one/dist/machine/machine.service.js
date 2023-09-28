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
exports.MachineService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const machine_module_1 = require("./models/machine.module");
let MachineService = class MachineService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    async createMachine(createMachineDto) {
        return this.companyRepository.create(createMachineDto);
    }
    async getAllMachine() {
        return this.companyRepository.findAll();
    }
    async getOneMachine(id) {
        return this.companyRepository.findByPk(id);
    }
    async deleteMachine(id) {
        return this.companyRepository.destroy({ where: { id } });
    }
    async updateMachine(id, updateMachineDto) {
        const machine = await this.companyRepository.update(updateMachineDto, {
            where: { id },
            returning: true
        });
        return machine[1][0];
    }
};
exports.MachineService = MachineService;
exports.MachineService = MachineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(machine_module_1.Machine)),
    __metadata("design:paramtypes", [Object])
], MachineService);
//# sourceMappingURL=machine.service.js.map