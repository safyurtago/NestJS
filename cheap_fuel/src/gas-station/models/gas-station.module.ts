import { GasStationBranch } from './../../gas-station-branch/models/gas-station-branch.module';
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface IGasStation {
    readonly main_gas_station_name: string;
}

@Table({tableName: "main_gas_station"})
export class GasStation extends Model<GasStation, IGasStation> {

    @Column ({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;
    @Column ({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    main_gas_station_name: string;

    @HasMany(() => GasStationBranch)
    gasStationBranches: Array<GasStationBranch>
    
}