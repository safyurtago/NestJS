import { Machine } from './../../machine/models/machine.module';
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Builder } from "src/builder/models/builder.module";

interface ICompany {
    readonly name: string;
    readonly address: string;
    readonly phone: string;
}

@Table({tableName: "company"})
export class Company extends Model<Company, ICompany> {
    @Column ({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number
    @Column ({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name: string
    @Column ({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string
    @Column ({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    phone: string

    @HasMany(() => Builder)
    builder: Builder[]

    @HasMany(() => Machine)
    machine: Machine[]
}