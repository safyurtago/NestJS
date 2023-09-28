import { UpdateFuelTypeDto } from './dto/update.fuel-type.dto';
import { CreateFuelTypeDto } from './dto/create.fuel-type.dto';
import { FuelType } from './models/fuel-type.module';
export declare class FuelTypeService {
    private fuelTypeRepository;
    constructor(fuelTypeRepository: typeof FuelType);
    create(createFuelTypeDto: CreateFuelTypeDto): Promise<FuelType>;
    getAll(): Promise<FuelType[]>;
    getById(id: number): Promise<FuelType>;
    deleteById(id: number): Promise<number>;
    updateById(id: number, updateFuelTypeDto: UpdateFuelTypeDto): Promise<[number, FuelType[]]>;
}
