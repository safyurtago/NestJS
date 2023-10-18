import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Customer } from "../../customer/models/customer.model";

interface ICustomerAddress {
  readonly customer_id: string;
  readonly country: string;
  readonly region: string;
  readonly district: string;
  readonly street: string;
  readonly house: string;
  readonly flat: string;
  readonly location: string;
  readonly post_index: string;
  readonly info: string;
}

@Table({tableName: "customer_address"})
export class CustomerAddress extends Model<CustomerAddress, ICustomerAddress> {
  @ApiProperty({example: "lglaj4tl25422020-asgda0sga0g0ag", description: "Customer Address id"})
  @Column({
    type: DataType.UUID, 
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  }) customer_address_id: string;
  @ApiProperty({example: "asg0sga0-sgd-as8g8asg-asg-asg", description: "Customer's id of card"})
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.UUID,
  }) customer_id: string;
  @BelongsTo(() => Customer)
  customer: Customer;
  @ApiProperty({example: "USA", description: "Country name"})
  @Column({
    type: DataType.STRING
  }) country: string;
  @ApiProperty({example: "Minnesota", description: "Region name"})
  @Column({
    type: DataType.STRING
  }) region: string;
  @ApiProperty({example: "minnesota", description: "District name"})
  @Column({
    type: DataType.STRING
  }) district: string;
  @ApiProperty({example: "black street", description: "street name"})
  @Column({
    type: DataType.STRING
  }) street: string;
  @ApiProperty({example: "272B", description: "house name"})
  @Column({
    type: DataType.STRING
  }) house: string;
  @ApiProperty({example: "1241.14214 12321. 12421", description: "location (lat, lan)"})
  @Column({
    type: DataType.STRING
  }) location: string;
  @ApiProperty({example: "132142", description: "Poat Index"})
  @Column({
    type: DataType.STRING
  }) post_index: string;
  @ApiProperty({example: "bla bla bla bla", description: "address info"})
  @Column({
    type: DataType.TEXT
  }) info: string;
}

