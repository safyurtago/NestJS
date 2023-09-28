import { GasStation } from './../../gas-station/models/gas-station.module';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface IGasStationBranch {
    readonly gas_sation_id: number;
    readonly branch_name: string;
    readonly address: string;
    readonly location: string;
    readonly phone: string;
}

@Table({tableName: "gas_station_branch"})
export class GasStationBranch extends Model<GasStationBranch, IGasStationBranch> {
    @Column ({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;
    

    @ForeignKey(() => GasStation)
    @Column ({
        type: DataType.INTEGER,
        allowNull: false
    })
    gas_sation_id: number;
    
    @BelongsTo(() => GasStation)
    gasStations: GasStation[];
    
    @Column ({
        type: DataType.STRING,
        allowNull: false
    })
    branch_name: string;
    @Column ({
        type: DataType.STRING,
        allowNull: false
    })
    address: string;
    @Column ({
        type: DataType.STRING,
        allowNull: false
    })
    location: string;
    @Column ({
        type: DataType.STRING,
        allowNull: false
    })
    phone: string;
}