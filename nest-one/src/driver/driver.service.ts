import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Driver } from './models/driver.module';

@Injectable()
export class DriverService {
    constructor(@InjectModel(Driver) private driverRepisotory: typeof Driver) {}

    async createDriever(createDriverDto: CreateDriverDto): Promise<Driver> {
        return this.driverRepisotory.create(createDriverDto)
    }

    async getAllDriver(): Promise<Driver[]> {
        return this.driverRepisotory.findAll();
    }

    async getOneDriver(id: number): Promise<Driver> {
        return this.driverRepisotory.findByPk(id)
    }

    async deleteDriver(id: number): Promise<number> {
        return this.driverRepisotory.destroy({where: {id}})
    }

    async updateDriver(id: number, updateDriverDto: UpdateDriverDto): Promise<[number, UpdateDriverDto[]]> {
        return this.driverRepisotory.update(updateDriverDto, {
            where: {id},
            returning: true
        })
    }
}
