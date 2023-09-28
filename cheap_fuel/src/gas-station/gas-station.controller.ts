import { UpdateGasStationDto } from './dto/update.gas-station.dto';
import { GasStation } from './models/gas-station.module';
import { CreateGasStationDto } from './dto/create.gas-station.dto';
import { GasStationService } from './gas-station.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('gas-station')
export class GasStationController {
    constructor (private readonly gasStationService: GasStationService) {}

    @Post('create')
    async createGasStaion(@Body() createGasStaionDto: CreateGasStationDto): Promise<GasStation> {
        return this.gasStationService.createGasStation(createGasStaionDto)
    }

    @Get('getall')
    async getAllGasStaion(): Promise<GasStation[]> {
        return this.gasStationService.getAllGasStation();
    }

    @Get('getall/:id')
    async getOneGasStation(@Param('id') id: number): Promise<GasStation> {
        return this.gasStationService.getOneGasStation(id);
    }

    @Delete('delete/:id')
    async deleteGasStation(@Param('id') id: number): Promise<number> {
        return this.gasStationService.deleteGasStation(id);
    }

    @Put('update/:id')
    async updateGasStation(@Param('id') id: number, @Body() updateGasStationDto: UpdateGasStationDto): Promise<[number, GasStation[]]> {
        return this.gasStationService.updateGasStation(id, updateGasStationDto);
    }
}
