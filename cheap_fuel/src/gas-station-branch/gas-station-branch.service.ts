import { UpdateGasStationBranchDto } from './dto/update.gas-station-branch.dto';
import { CreateGasStationBranchDto } from './dto/create.gas-station-branch.dto';
import { GasStationBranch } from './models/gas-station-branch.module';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GasStationBranchService {
    constructor(@InjectModel(GasStationBranch) private gasStationBranchRepository: typeof GasStationBranch) {}
    
    async cerateGasStationBranch(createGasStationBranchDto: CreateGasStationBranchDto): Promise<GasStationBranch> {
        return this.gasStationBranchRepository.create(createGasStationBranchDto)
    }

    async getAllGasStationBranch(): Promise<GasStationBranch[]> {
        return this.gasStationBranchRepository.findAll({include: {all: true}})
    }

    async getOneGasStationBranch(id: number): Promise<GasStationBranch> {
        return this.gasStationBranchRepository.findByPk(id, {include: {all: true}});
    }

    async deleteGasStationBranch(id: number): Promise<number> {
        return this.gasStationBranchRepository.destroy({where: {id}});
    }

    async updateGasStation(id: number, updateGasStationBranchDto: UpdateGasStationBranchDto): Promise<[number, GasStationBranch[]]> {
        return this.gasStationBranchRepository.update(updateGasStationBranchDto, {where: {id}, returning: true})
    }
}
