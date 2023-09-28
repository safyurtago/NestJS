import { Machine } from './../../machine/models/machine.module';
import { Model } from "sequelize-typescript";
interface IDriver {
    readonly first_name: string;
    readonly last_name: string;
    readonly phone: string;
    readonly driver_license: string;
}
export declare class Driver extends Model<Driver, IDriver> {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    driver_license: string;
    machines: Machine[];
}
export {};
