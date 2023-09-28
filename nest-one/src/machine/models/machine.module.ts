import { Driver } from './../../driver/models/driver.module';
import { MachineDriver } from './../../machine_driver/models/machine-driver.module';
import { Company } from 'src/company/models/company.model';
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

interface IMachine {
    readonly model: string;
    readonly name: string;
}

@Table({tableName: "machine"})
export class Machine extends Model<Machine, IMachine> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    model: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name: string;

    @ForeignKey(() => Company)
    @Column({ type: DataType.INTEGER, onDelete: 'RESTRICT', onUpdate: 'CASCADE'})
    companyId: number

    @BelongsTo(() => Company)
    company: Company

    @BelongsToMany(() => Driver, () => MachineDriver)
    drivers: Driver[]
} 