import { Model } from "sequelize-typescript";
interface IFuelType {
    readonly name: string;
}
export declare class FuelType extends Model<FuelType, IFuelType> {
    id: string;
    name: string;
}
export {};
