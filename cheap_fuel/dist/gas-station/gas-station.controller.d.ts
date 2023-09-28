import { UpdateGasStationDto } from './dto/update.gas-station.dto';
import { GasStation } from './models/gas-station.module';
import { CreateGasStationDto } from './dto/create.gas-station.dto';
import { GasStationService } from './gas-station.service';
export declare class GasStationController {
    private readonly gasStationService;
    constructor(gasStationService: GasStationService);
    createGasStaion(createGasStaionDto: CreateGasStationDto): Promise<GasStation>;
    getAllGasStaion(): Promise<GasStation[]>;
    getOneGasStation(id: number): Promise<GasStation>;
    deleteGasStation(id: number): Promise<number>;
    updateGasStation(id: number, updateGasStationDto: UpdateGasStationDto): Promise<[number, GasStation[]]>;
}
