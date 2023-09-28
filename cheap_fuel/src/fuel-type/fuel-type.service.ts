import { UpdateFuelTypeDto } from './dto/update.fuel-type.dto';
import { CreateFuelTypeDto } from './dto/create.fuel-type.dto';
import { FuelType } from './models/fuel-type.module';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class FuelTypeService {
    constructor(@InjectModel(FuelType) private fuelTypeRepository: typeof FuelType) {}

    async create(createFuelTypeDto: CreateFuelTypeDto): Promise<FuelType> {
        return this.fuelTypeRepository.create(createFuelTypeDto)
    }

    async getAll(): Promise<FuelType[]> {
        return this.fuelTypeRepository.findAll({include: {all: true}})
    }

    async getById(id: number): Promise<FuelType> {
        return this.fuelTypeRepository.findByPk(id, {include: {all: true}});
    }

    async deleteById(id: number): Promise<number> {
        return this.fuelTypeRepository.destroy({where: {id}})
    }

    async updateById(id: number, updateFuelTypeDto: UpdateFuelTypeDto): Promise<[number, FuelType[]]> {
        return this.fuelTypeRepository.update(updateFuelTypeDto, {where: {id}, returning: true})
    }
}
