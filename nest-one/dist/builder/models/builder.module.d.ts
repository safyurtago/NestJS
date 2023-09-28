import { Model } from "sequelize-typescript";
import { Company } from "src/company/models/company.model";
interface IBuilder {
    readonly full_name: string;
    readonly birth_date: Date;
    readonly salary: number;
}
export declare class Builder extends Model<Builder, IBuilder> {
    id: number;
    full_name: string;
    birth_date: Date;
    salary: number;
    companyId: number;
    company: Company;
}
export {};
