import { UpdateGasStationFuelTypeDto } from './dto/update.gas-station-fuel-type.dto';
import { GasStationFuelType } from './models/gas-station-fuel-type.module';
import { CreateGasStationFuelTypeDto } from './dto/create.gas-station-fuel-type.dto';
import { GasStationFuelTypeService } from './gas-station-fuel-type.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('gas-station-fuel-type')
export class GasStationFuelTypeController {
    constructor (private readonly gasStationFuelTypeService: GasStationFuelTypeService) {}

    @Post('create')
    async create(@Body() createGasStationFuelTypeDto: CreateGasStationFuelTypeDto): Promise<GasStationFuelType> {
        return this.gasStationFuelTypeService.createGasStationFuelType(createGasStationFuelTypeDto)
    }

    @Get('getall')
    async getAll(): Promise<GasStationFuelType[]> {
        return this.gasStationFuelTypeService.getAllGasStationFuelTypes()
    }

    @Get('getall/:id')
    async getById(@Param('id')  id: number): Promise<GasStationFuelType> {
        return this.gasStationFuelTypeService.getOneGasStationFuelType(id)
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<number> {
        return this.gasStationFuelTypeService.deleteOneGasStationFuelType(id);
    }

    @Put('update/:id')
    async update(@Param('id') id: number, updateGasStationFuelTypeDto: UpdateGasStationFuelTypeDto): Promise<[number, GasStationFuelType[]]> {
        return this.gasStationFuelTypeService.updateGasStationFuelType(id,updateGasStationFuelTypeDto)
    }
}
