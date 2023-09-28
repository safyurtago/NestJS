import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company } from "src/company/models/company.model";

interface IBuilder {
    readonly full_name: string;
    readonly birth_date: Date;
    readonly salary: number;
}
@Table({tableName: "builder"})
export class Builder extends Model<Builder, IBuilder> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    full_name: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    birth_date: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    salary: number;

    @ForeignKey(() => Company)
    @Column({ type: DataType.INTEGER, onDelete: 'RESTRICT', onUpdate: 'CASCADE'})
    companyId: number

    @BelongsTo(() => Company)
    company: Company;
}