import { Driver } from './../../driver/models/driver.module';
import { Company } from 'src/company/models/company.model';
import { Model } from "sequelize-typescript";
interface IMachine {
    readonly model: string;
    readonly name: string;
}
export declare class Machine extends Model<Machine, IMachine> {
    id: number;
    model: string;
    name: string;
    companyId: number;
    company: Company;
    drivers: Driver[];
}
export {};
