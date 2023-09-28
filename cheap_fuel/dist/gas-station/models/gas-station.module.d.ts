import { GasStationBranch } from './../../gas-station-branch/models/gas-station-branch.module';
import { Model } from "sequelize-typescript";
interface IGasStation {
    readonly main_gas_station_name: string;
}
export declare class GasStation extends Model<GasStation, IGasStation> {
    id: number;
    main_gas_station_name: string;
    gasStationBranches: Array<GasStationBranch>;
}
export {};
