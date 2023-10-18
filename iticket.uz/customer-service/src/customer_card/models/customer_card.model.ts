import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Customer } from "../../customer/models/customer.model";

interface ICustomerCard {
  readonly customer_id: string;
  readonly name: string;
  readonly phone: string;
  readonly card_serial: bigint;
  readonly year: number;
  readonly month: number;
  readonly is_active: boolean;
  readonly is_main: boolean;
}

@Table({tableName: "customer_card"})
export class CustomerCard extends Model<CustomerCard, ICustomerCard> {
  @ApiProperty({example: "asg0sga0-sgd-as8g8asg-asg-asg", description: "Card unique identifier"})
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  }) customer_card_id: string;
  @ApiProperty({example: "asg0sga0-sgd-as8g8asg-asg-asg", description: "Customer's id of card"})
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.UUID,
  }) customer_id: string;
  @BelongsTo(() => Customer)
  customer: Customer;
  @ApiProperty({example: "jhon's card", description: "Card's name"})
  @Column({ 
    type: DataType.STRING
  }) name: string;
  @ApiProperty({example: "+998901234567", description: "Customer phone"})
  @Column({ 
    type: DataType.STRING
  }) phone: string;
  @ApiProperty({example: "9898 1992 1299 1232", description: "Card's serial number"})
  @Column({ 
    type: DataType.BIGINT
  }) card_serial: bigint;
  @ApiProperty({example: "2023", description: "Card's expire year"})
  @Column({ 
    type: DataType.INTEGER
  }) year: number;
  @ApiProperty({example: "12", description: "Card's expire month"})
  @Column({ 
    type: DataType.INTEGER
  }) month: number;
  @ApiProperty({example: false, description: "Card's status"})
  @Column({ 
    type: DataType.BOOLEAN,
    defaultValue: true
  }) is_active: boolean;
  @ApiProperty({example: false, description: "Card role"})
  @Column({ 
    type: DataType.BOOLEAN,
    defaultValue: false
  }) is_main: boolean;
}
