import { UpdateDriverDto } from './dto/update-driver.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverService } from './driver.service';
import { Driver } from './models/driver.module';
export declare class DriverController {
    private readonly driverService;
    constructor(driverService: DriverService);
    createDriver(createDriverDto: CreateDriverDto): Promise<Driver>;
    getAllDriver(): Promise<Driver[]>;
    getOneDriver(id: number): Promise<Driver>;
    deleteOne(id: number): Promise<number>;
    updateDriver(id: number, updateDriverDto: UpdateDriverDto): Promise<[number, UpdateDriverDto[]]>;
}
