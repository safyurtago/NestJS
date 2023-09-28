import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './models/driver.module';
export declare class DriverService {
    private driverRepisotory;
    constructor(driverRepisotory: typeof Driver);
    createDriever(createDriverDto: CreateDriverDto): Promise<Driver>;
    getAllDriver(): Promise<Driver[]>;
    getOneDriver(id: number): Promise<Driver>;
    deleteDriver(id: number): Promise<number>;
    updateDriver(id: number, updateDriverDto: UpdateDriverDto): Promise<[number, UpdateDriverDto[]]>;
}
