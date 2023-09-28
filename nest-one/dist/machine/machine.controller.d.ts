import { CreateMachineDto } from './dto/create-machine.dto';
import { MachineService } from './machine.service';
import { Machine } from './models/machine.module';
import { UpdateMachineDto } from './dto/update-machine.dto';
export declare class MachineController {
    private machineService;
    constructor(machineService: MachineService);
    createMachine(createMachineDto: CreateMachineDto): Promise<Machine>;
    getAllMachine(): Promise<Machine[]>;
    getOneMachine(id: number): Promise<Machine>;
    deleteMachine(id: number): Promise<number>;
    updateMachine(id: number, updateMachineDto: UpdateMachineDto): Promise<Machine>;
}
