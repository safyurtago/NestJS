import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IFuelType {
    readonly name: string;
}

@Table({tableName: "fuel_type"})
export class FuelType extends Model<FuelType, IFuelType> {

    @Column ({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: string;
    @Column ({
        type: DataType.STRING,
        allowNull: true,
        unique: true
    })
    name: string;
}