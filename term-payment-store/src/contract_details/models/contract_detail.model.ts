import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Contract } from "../../contract/models/contract.model";

interface IContractDetail {
    contract_id: number,
    info: string
    total_amount: number
}

@Table({tableName: 'contract_detail'})
export class ContractDetail extends Model<ContractDetail, IContractDetail> {
    @ApiProperty({example: 1, description: 'Unique Id'})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }) id: number;
    @ApiProperty({example: 2, description: "Contract Id"}) 
    @ForeignKey(() => Contract)
    @Column({
        type: DataType.INTEGER,
        onDelete: "CASCADE",
    }) contract_id: number;
    @BelongsTo(() => Contract)
    contract: Contract;
    @ApiProperty({example: "bla bla bla infos ", description: "Info"})
    @Column({
        type: DataType.STRING,
    }) info: string;
    @ApiProperty({example: 55050, description: "Contract total amount"})
    @Column({
        type: DataType.BIGINT,
    }) total_amount: number;
    
}
