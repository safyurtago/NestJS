import { UpdateFuelTypeDto } from './dto/update.fuel-type.dto';
import { CreateFuelTypeDto } from './dto/create.fuel-type.dto';
import { FuelTypeService } from './fuel-type.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FuelType } from './models/fuel-type.module';

@Controller('fuel-type')
export class FuelTypeController {
    constructor(private readonly fuelTypeService: FuelTypeService) {}

    @Post('create')
    async create(@Body() createFuelTypeDto: CreateFuelTypeDto): Promise<FuelType> {
        return this.fuelTypeService.create(createFuelTypeDto);
    }

    @Get('getall')
    async getAll(): Promise<FuelType[]> {
        return this.fuelTypeService.getAll();
    }

    @Get('getall/:id')
    async getOneByID(@Param('id') id: number): Promise<FuelType> {
        return this.fuelTypeService.getById(id);
    }

    @Delete('delete/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.fuelTypeService.deleteById(id);
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() updateFuelTypeDto: UpdateFuelTypeDto): Promise<[number, FuelType[]]> {
        return this.fuelTypeService.updateById(id, updateFuelTypeDto);
    }
}
