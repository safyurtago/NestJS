import { UpdateMachineDto } from './dto/update-machine.dto';
import { CreateMachineDto } from './dto/create-machine.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Machine } from './models/machine.module';

@Injectable()
export class MachineService {
    constructor(@InjectModel(Machine) private companyRepository: typeof Machine) {}

    async createMachine(createMachineDto: CreateMachineDto): Promise<Machine> {
        return this.companyRepository.create(createMachineDto)
    }

    async getAllMachine(): Promise<Machine[]> {
        return this.companyRepository.findAll();
    }

    async getOneMachine(id: number): Promise<Machine> {
        return this.companyRepository.findByPk(id);
    }

    async deleteMachine(id: number): Promise<number> {
        return this.companyRepository.destroy({where: {id}})
    }

    async updateMachine(id: number, updateMachineDto: UpdateMachineDto): Promise<Machine> {
        const machine = await this.companyRepository.update(updateMachineDto, {
            where: {id},
            returning: true
        });
        return machine[1][0]
    }
}
