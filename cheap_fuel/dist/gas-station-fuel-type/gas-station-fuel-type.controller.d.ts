import { UpdateGasStationFuelTypeDto } from './dto/update.gas-station-fuel-type.dto';
import { GasStationFuelType } from './models/gas-station-fuel-type.module';
import { CreateGasStationFuelTypeDto } from './dto/create.gas-station-fuel-type.dto';
import { GasStationFuelTypeService } from './gas-station-fuel-type.service';
export declare class GasStationFuelTypeController {
    private readonly gasStationFuelTypeService;
    constructor(gasStationFuelTypeService: GasStationFuelTypeService);
    create(createGasStationFuelTypeDto: CreateGasStationFuelTypeDto): Promise<GasStationFuelType>;
    getAll(): Promise<GasStationFuelType[]>;
    getById(id: number): Promise<GasStationFuelType>;
    delete(id: number): Promise<number>;
    update(id: number, updateGasStationFuelTypeDto: UpdateGasStationFuelTypeDto): Promise<[number, GasStationFuelType[]]>;
}
