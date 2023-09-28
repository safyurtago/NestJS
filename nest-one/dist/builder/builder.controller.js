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
exports.BuilderController = void 0;
const common_1 = require("@nestjs/common");
const builder_service_1 = require("./builder.service");
const create_builder_dto_1 = require("./dto/create-builder.dto");
const update_builder_dto_1 = require("./dto/update-builder.dto");
let BuilderController = class BuilderController {
    constructor(builderService) {
        this.builderService = builderService;
    }
    async createBuilder(createBuilderDto) {
        return this.builderService.createBuilder(createBuilderDto);
    }
    async getAllBuilder() {
        return this.builderService.getAll();
    }
    async getOneBuilder(id) {
        return this.builderService.getOne(id);
    }
    async deleteBuilder(id) {
        return this.builderService.deleteOne(id);
    }
    async updateBuilder(id, updateBuilderDto) {
        return this.builderService.updateOne(id, updateBuilderDto);
    }
};
exports.BuilderController = BuilderController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_builder_dto_1.CreateBuilderDto]),
    __metadata("design:returntype", Promise)
], BuilderController.prototype, "createBuilder", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuilderController.prototype, "getAllBuilder", null);
__decorate([
    (0, common_1.Get)('getOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BuilderController.prototype, "getOneBuilder", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BuilderController.prototype, "deleteBuilder", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_builder_dto_1.UpdateBuilderDto]),
    __metadata("design:returntype", Promise)
], BuilderController.prototype, "updateBuilder", null);
exports.BuilderController = BuilderController = __decorate([
    (0, common_1.Controller)('builder'),
    __metadata("design:paramtypes", [builder_service_1.BuilderService])
], BuilderController);
//# sourceMappingURL=builder.controller.js.map