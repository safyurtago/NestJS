import { UpdateDriverDto } from './dto/update-driver.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverService } from './driver.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Driver } from './models/driver.module';

@Controller('driver')
export class DriverController {
    constructor(private readonly driverService: DriverService) {}

    @Post('create')
    async createDriver(@Body() createDriverDto: CreateDriverDto): Promise<Driver> {
        return this.driverService.createDriever(createDriverDto)
    }

    @Get('getAll')
    async getAllDriver(): Promise<Driver[]> {
        return this.driverService.getAllDriver()
    }

    @Get('getOne/:id')
    async getOneDriver(@Param('id') id: number): Promise<Driver> {
        return this.driverService.getOneDriver(id);
    }   

    @Delete('delete/:id')
    async deleteOne(@Param('id') id: number): Promise<number> {
        return this.driverService.deleteDriver(id)
    }

    @Put('update/:id')
    async updateDriver(@Param('id') id: number, @Body() updateDriverDto: UpdateDriverDto): Promise<[number, UpdateDriverDto[]]> {
        return this.driverService.updateDriver(id, updateDriverDto);
    }

}