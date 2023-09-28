import { GasStationBranch } from './../../gas-station-branch/models/gas-station-branch.module';
import { FuelType } from './../../fuel-type/models/fuel-type.module';
import {Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface IGasStationFuelType {
    readonly gas_station_branch_id: number;
    readonly fuel_type_id: number;
    readonly price: number;
    readonly isActive: boolean;
}

@Table({tableName: 'gas_station_fuel_type'})
export class GasStationFuelType extends Model<GasStationFuelType, IGasStationFuelType> {

    @Column ({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;
    @ForeignKey(() => GasStationBranch)
    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
    })
    gas_station_branch_id: number;
    @ForeignKey(() => FuelType)
    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fuel_type_id: number;
    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number;
    @Column ({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isActive: boolean;
}