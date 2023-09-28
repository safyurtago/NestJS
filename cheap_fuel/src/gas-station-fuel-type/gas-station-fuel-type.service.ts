import { UpdateGasStationFuelTypeDto } from './dto/update.gas-station-fuel-type.dto';
import {CreateGasStationFuelTypeDto } from './dto/create.gas-station-fuel-type.dto';
import { GasStationFuelType } from './models/gas-station-fuel-type.module';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GasStationFuelTypeService {
    constructor (@InjectModel(GasStationFuelType) private gasStationFuelTypeRepository: typeof GasStationFuelType) { }

    async createGasStationFuelType(createGasStationFuelTypeDto: CreateGasStationFuelTypeDto): Promise<GasStationFuelType> {
        return this.gasStationFuelTypeRepository.create(createGasStationFuelTypeDto)
    }

    async getAllGasStationFuelTypes(): Promise<GasStationFuelType[]> {
        return this.gasStationFuelTypeRepository.findAll({include: {all: true}})
    }

    async getOneGasStationFuelType(id: number): Promise<GasStationFuelType> {
        return this.gasStationFuelTypeRepository.findByPk(id, {include: {all: true}})
    }

    async deleteOneGasStationFuelType(id: number): Promise<number> {
        return this.gasStationFuelTypeRepository.destroy({where: {id}})
    }

    async updateGasStationFuelType(id: number, updateGasStationFuelTypeDto: UpdateGasStationFuelTypeDto): Promise<[number, GasStationFuelType[]]> {
        return this.gasStationFuelTypeRepository.update(updateGasStationFuelTypeDto, {where: {id}, returning: true})
    }

}
