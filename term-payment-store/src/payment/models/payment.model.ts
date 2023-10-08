import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Customer } from "../../customer/models/customer.model";
import { Contract } from "../../contract/models/contract.model";

interface IPayment {
    customer_id: number;
    contract_id: number;
    amount: number;
    payment_method: string;
}

@Table({tableName: 'payment'})
export class Payment extends Model< Payment, IPayment> {
    @ApiProperty({example: 1, description: 'Payment Id'})
    @Column({ 
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }) id: number;
    @ApiProperty({example: 2, description: 'customer_id'})
    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER,
        onDelete: "CASCADE",
    }) customer_id: number;
    @BelongsTo(() => Customer)
    customer: Customer;
    @ApiProperty({example: 3, description: "contract_id"}) 
    @ForeignKey(() => Contract)
    @Column({
        type: DataType.INTEGER,
        onDelete: "CASCADE",
    }) contract_id: number;
    @BelongsTo(() => Contract)
    contract: Contract;

    @ApiProperty({example: 4, description: " payment amount"})
    @Column({
        type: DataType.BIGINT
    }) amount: number;

    @ApiProperty({example: "Cash", description: "Paymen method"})
    @Column({
        type: DataType.STRING
    }) paymen_method: string;
}
