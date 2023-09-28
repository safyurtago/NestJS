import { Model } from "sequelize-typescript";
export declare class MachineDriver extends Model<MachineDriver> {
    id: number;
    machineId: number;
    driverId: number;
}
