import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Customer } from "../../customer/models/customer.model";
import { Admin } from "../../admin/models/admin.model";
import { ContractDetail } from "../../contract_details/models/contract_detail.model";
import { Payment } from "../../payment/models/payment.model";

interface IContract {
    customer_id: number;
    admin_id: number;
    first_payment: number;
    total_amount: number;
    start_date: Date;
    end_date: Date;
    status: boolean;
    mandatory_date: Date;
    contract_file: string;
}

@Table({tableName: 'contract'})
export class Contract extends Model<Contract, IContract> {
    @ApiProperty({example: 1, description: "Unique Id"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }) id: number

    @ApiProperty({example: 2, description: "Customer Id"}) 
    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER,
        onDelete: "CASCADE"
    }) customer_id: number;
    @BelongsTo(() => Customer)
    customer: Customer;

  @ApiProperty({example: 2, description: "Admin Id"}) 
    @ForeignKey(() => Admin)
    @Column({
        type: DataType.INTEGER,
        onDelete: "CASCADE"
    }) admin_id: number;
    @BelongsTo(() => Admin)
    admin: Admin;

    @ApiProperty({example: 40000, description: "First Payment "})
    @Column({ 
        type: DataType.BIGINT,
    }) first_payment: number;

    @ApiProperty({example: 500000, description: "Total Amount "})
    @Column({ 
        type: DataType.BIGINT,
    }) total_amount: number;

    @ApiProperty({example: "", description: "Start Date "})
    @Column({ 
        type: DataType.DATE,
        defaultValue: new Date(),
    }) start_date: Date;

    @ApiProperty({example: "", description: "End Date "})
    @Column({ 
        type: DataType.DATE,
    }) end_date: Date;

    @ApiProperty({example: true, description: " status "})
    @Column({ 
        type: DataType.BOOLEAN,
        defaultValue: true
    }) status: boolean;

    @ApiProperty({example: "", description: "Mandatory date for payment "})
    @Column({ 
        type: DataType.DATE,
    }) mandatory_date: Date;

    @ApiProperty({example: "asdagasgasgagssdgdasg.pdf", description: "Contract File Name "})
    @Column({ 
        type: DataType.STRING,
    }) contract_file: string;

    @HasOne(() => ContractDetail)
    contract_detail: ContractDetail

    @HasMany(() => Payment)
    payment: Payment[];
}
