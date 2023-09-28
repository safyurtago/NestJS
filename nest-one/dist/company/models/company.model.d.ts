import { Machine } from './../../machine/models/machine.module';
import { Model } from "sequelize-typescript";
import { Builder } from "src/builder/models/builder.module";
interface ICompany {
    readonly name: string;
    readonly address: string;
    readonly phone: string;
}
export declare class Company extends Model<Company, ICompany> {
    id: number;
    name: string;
    address: string;
    phone: string;
    builder: Builder[];
    machine: Machine[];
}
export {};
