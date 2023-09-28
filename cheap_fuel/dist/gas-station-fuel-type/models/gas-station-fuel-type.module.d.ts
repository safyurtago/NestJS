import { Model } from "sequelize-typescript";
interface IGasStationFuelType {
    readonly gas_station_branch_id: number;
    readonly fuel_type_id: number;
    readonly price: number;
    readonly isActive: boolean;
}
export declare class GasStationFuelType extends Model<GasStationFuelType, IGasStationFuelType> {
    id: number;
    gas_station_branch_id: number;
    fuel_type_id: number;
    price: number;
    isActive: boolean;
}
export {};
