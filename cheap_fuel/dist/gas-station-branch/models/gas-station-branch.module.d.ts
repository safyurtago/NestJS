import { GasStation } from './../../gas-station/models/gas-station.module';
import { Model } from "sequelize-typescript";
interface IGasStationBranch {
    readonly gas_sation_id: number;
    readonly branch_name: string;
    readonly address: string;
    readonly location: string;
    readonly phone: string;
}
export declare class GasStationBranch extends Model<GasStationBranch, IGasStationBranch> {
    id: number;
    gas_sation_id: number;
    gasStations: GasStation[];
    branch_name: string;
    address: string;
    location: string;
    phone: string;
}
export {};
