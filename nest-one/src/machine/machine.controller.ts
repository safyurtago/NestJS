import { CreateMachineDto } from './dto/create-machine.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MachineService } from './machine.service';
import { Machine } from './models/machine.module';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Controller('machine')
export class MachineController {
    constructor(private machineService: MachineService) {}

    @Post('create')
    async createMachine(@Body() createMachineDto: CreateMachineDto): Promise<Machine> {
        return this.machineService.createMachine(createMachineDto);
    }

    @Get('getAll')
    async getAllMachine(): Promise<Machine[]> {
        return this.machineService.getAllMachine();
    }

    @Get('getAll/:id')
    async getOneMachine(@Param('id') id: number): Promise<Machine> {
        return this.machineService.getOneMachine(id);
    }

    @Delete('delete/:id')
    async deleteMachine(@Param('id') id: number): Promise<number> {
        return this.machineService.deleteMachine(id);
    }

    @Put('update/:id')
    async updateMachine(@Param('id') id: number, @Body() updateMachineDto: UpdateMachineDto): Promise<Machine> {
        return this.machineService.updateMachine(id, updateMachineDto);
    }
}
