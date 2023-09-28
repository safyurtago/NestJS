import { UpdateGasStationDto } from './dto/update.gas-station.dto';
import { CreateGasStationDto } from './dto/create.gas-station.dto';
import { GasStation } from './models/gas-station.module';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GasStationService {
    constructor (@InjectModel(GasStation) private gasStationRepository: typeof GasStation) {}

    async createGasStation(createGasStationDto: CreateGasStationDto): Promise<GasStation> {
        return this.gasStationRepository.create(createGasStationDto)
    }

    async getAllGasStation(): Promise<GasStation[]> {
        return this.gasStationRepository.findAll({
            include: {all: true}
        });
    }

    async getOneGasStation(id: number): Promise<GasStation> {
        return this.gasStationRepository.findByPk(id, {include: {all: true}});
    }

    async deleteGasStation(id: number): Promise<number> {
        return this.gasStationRepository.destroy({where: {id}});
    }

    async updateGasStation(id: number, updateGasStationDto: UpdateGasStationDto): Promise<[number, GasStation[]]> {
        return this.gasStationRepository.update( updateGasStationDto, {where: {id}, returning: true})
    }
}
