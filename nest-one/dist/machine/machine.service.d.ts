import { UpdateMachineDto } from './dto/update-machine.dto';
import { CreateMachineDto } from './dto/create-machine.dto';
import { Machine } from './models/machine.module';
export declare class MachineService {
    private companyRepository;
    constructor(companyRepository: typeof Machine);
    createMachine(createMachineDto: CreateMachineDto): Promise<Machine>;
    getAllMachine(): Promise<Machine[]>;
    getOneMachine(id: number): Promise<Machine>;
    deleteMachine(id: number): Promise<number>;
    updateMachine(id: number, updateMachineDto: UpdateMachineDto): Promise<Machine>;
}
