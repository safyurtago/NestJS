import { Driver } from './../../driver/models/driver.module';
import { Machine } from './../../machine/models/machine.module';
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

@Table({tableName: 'machine_driver'})
export class MachineDriver extends Model<MachineDriver> {

    @Column ({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number

    @ForeignKey(() => Machine)
    @Column({type: DataType.INTEGER, onDelete: "RESTRICT", onUpdate: "CASCADE"})
    machineId: number

    @ForeignKey(() => Driver)
    @Column({type: DataType.INTEGER, onDelete: "RESTRICT", onUpdate: "CASCADE"})
    driverId: number
}