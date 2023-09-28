import { UpdateFuelTypeDto } from './dto/update.fuel-type.dto';
import { CreateFuelTypeDto } from './dto/create.fuel-type.dto';
import { FuelTypeService } from './fuel-type.service';
import { FuelType } from './models/fuel-type.module';
export declare class FuelTypeController {
    private readonly fuelTypeService;
    constructor(fuelTypeService: FuelTypeService);
    create(createFuelTypeDto: CreateFuelTypeDto): Promise<FuelType>;
    getAll(): Promise<FuelType[]>;
    getOneByID(id: number): Promise<FuelType>;
    deleteById(id: number): Promise<number>;
    update(id: number, updateFuelTypeDto: UpdateFuelTypeDto): Promise<[number, FuelType[]]>;
}
