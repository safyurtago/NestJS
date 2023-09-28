import { UpdateGasStationBranchDto } from './dto/update.gas-station-branch.dto';
import { GasStationBranch } from './models/gas-station-branch.module';
import { CreateGasStationBranchDto } from './dto/create.gas-station-branch.dto';
import { GasStationBranchService } from './gas-station-branch.service';
export declare class GasStationBranchController {
    private readonly gasStationBranchService;
    constructor(gasStationBranchService: GasStationBranchService);
    create(createGasStationBranchDto: CreateGasStationBranchDto): Promise<GasStationBranch>;
    getAll(): Promise<GasStationBranch[]>;
    getByID(id: number): Promise<GasStationBranch>;
    deleteByID(id: number): Promise<number>;
    updateByID(id: number, updateGasStationBranchDto: UpdateGasStationBranchDto): Promise<[number, GasStationBranch[]]>;
}
