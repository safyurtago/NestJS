import { UpdateGasStationDto } from './dto/update.gas-station.dto';
import { CreateGasStationDto } from './dto/create.gas-station.dto';
import { GasStation } from './models/gas-station.module';
export declare class GasStationService {
    private gasStationRepository;
    constructor(gasStationRepository: typeof GasStation);
    createGasStation(createGasStationDto: CreateGasStationDto): Promise<GasStation>;
    getAllGasStation(): Promise<GasStation[]>;
    getOneGasStation(id: number): Promise<GasStation>;
    deleteGasStation(id: number): Promise<number>;
    updateGasStation(id: number, updateGasStationDto: UpdateGasStationDto): Promise<[number, GasStation[]]>;
}
