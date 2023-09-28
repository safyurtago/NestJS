import { CreateBuilderDto } from './dto/create-builder.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Builder } from './models/builder.module';
import { UpdateBuilderDto } from './dto/update-builder.dto';

@Injectable()
export class BuilderService {
    constructor(@InjectModel(Builder) private builderRepository: typeof Builder) {}

    async createBuilder(createBuilderDto: CreateBuilderDto): Promise<Builder> {
        return this.builderRepository.create(createBuilderDto)
    }

    async getAll(): Promise<Builder[]> {
        return this.builderRepository.findAll({
            include: {all: true},
        });
    }

    async getOne(id: number): Promise<Builder> {
        return this.builderRepository.findByPk(id, {include: {all: true}});
    }

    async deleteOne(id: number): Promise<number> {
        return this.builderRepository.destroy({where: {id}})
    }

    async updateOne(id: number, updateBuilderDto: UpdateBuilderDto): Promise<[number, UpdateBuilderDto[]]> {
        return this.builderRepository.update(updateBuilderDto, {
            where: {id},
            returning: true
        })
    }
}
