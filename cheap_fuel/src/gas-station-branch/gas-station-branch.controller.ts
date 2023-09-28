import { UpdateGasStationBranchDto } from './dto/update.gas-station-branch.dto';
import { GasStationBranch } from './models/gas-station-branch.module';
import { CreateGasStationBranchDto } from './dto/create.gas-station-branch.dto';
import { GasStationBranchService } from './gas-station-branch.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('gas-station-branch')
export class GasStationBranchController {
    constructor(private readonly gasStationBranchService: GasStationBranchService) {}

    @Post('create')
    async create(@Body() createGasStationBranchDto: CreateGasStationBranchDto): Promise<GasStationBranch> {
        return this.gasStationBranchService.cerateGasStationBranch(createGasStationBranchDto)
    }

    @Get('getall')
    async getAll(): Promise<GasStationBranch[]> {
        return this.gasStationBranchService.getAllGasStationBranch();
    }

    @Get('getall/:id')
    async getByID(@Param('id') id: number): Promise<GasStationBranch> {
        return this.gasStationBranchService.getOneGasStationBranch(id)
    }

    @Delete('delete/:id')
    async deleteByID(@Param('id')  id: number): Promise<number> {
        return this.gasStationBranchService.deleteGasStationBranch(id)
    }

    @Put('update/:id')
    async updateByID(@Param('id')  id: number, @Body() updateGasStationBranchDto: UpdateGasStationBranchDto): Promise<[number, GasStationBranch[]]> {
        return this.gasStationBranchService.updateGasStation(id, updateGasStationBranchDto)
    }
}
