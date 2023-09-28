import { UpdateGasStationFuelTypeDto } from './dto/update.gas-station-fuel-type.dto';
import { CreateGasStationFuelTypeDto } from './dto/create.gas-station-fuel-type.dto';
import { GasStationFuelType } from './models/gas-station-fuel-type.module';
export declare class GasStationFuelTypeService {
    private gasStationFuelTypeRepository;
    constructor(gasStationFuelTypeRepository: typeof GasStationFuelType);
    createGasStationFuelType(createGasStationFuelTypeDto: CreateGasStationFuelTypeDto): Promise<GasStationFuelType>;
    getAllGasStationFuelTypes(): Promise<GasStationFuelType[]>;
    getOneGasStationFuelType(id: number): Promise<GasStationFuelType>;
    deleteOneGasStationFuelType(id: number): Promise<number>;
    updateGasStationFuelType(id: number, updateGasStationFuelTypeDto: UpdateGasStationFuelTypeDto): Promise<[number, GasStationFuelType[]]>;
}
