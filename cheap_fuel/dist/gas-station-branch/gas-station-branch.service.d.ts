import { UpdateGasStationBranchDto } from './dto/update.gas-station-branch.dto';
import { CreateGasStationBranchDto } from './dto/create.gas-station-branch.dto';
import { GasStationBranch } from './models/gas-station-branch.module';
export declare class GasStationBranchService {
    private gasStationBranchRepository;
    constructor(gasStationBranchRepository: typeof GasStationBranch);
    cerateGasStationBranch(createGasStationBranchDto: CreateGasStationBranchDto): Promise<GasStationBranch>;
    getAllGasStationBranch(): Promise<GasStationBranch[]>;
    getOneGasStationBranch(id: number): Promise<GasStationBranch>;
    deleteGasStationBranch(id: number): Promise<number>;
    updateGasStation(id: number, updateGasStationBranchDto: UpdateGasStationBranchDto): Promise<[number, GasStationBranch[]]>;
}
