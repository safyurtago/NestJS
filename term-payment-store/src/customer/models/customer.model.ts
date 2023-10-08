import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CustomerProduct } from "../../customer_product/models/customer_product.model";

interface ICustomer {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    hashed_password: string;
    phone_number: string;
    passport_serial_number: string;
    address: string;
    status: boolean;
    hashed_refresh_token: string;
}


@Table({tableName: "customer"})
export class Customer extends Model<Customer, ICustomer> {
    @ApiProperty({example: 1, description: "Unique ID"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }) id: string;

    @ApiProperty({example: "Jhon", description: "Cusomer first name"})
    @Column({
        type: DataType.STRING,
    }) first_name: string;

    @ApiProperty({example: "Doe", description: "Cusomer last name"})
    @Column({
        type: DataType.STRING,
    }) last_name: string;
    
    
    @ApiProperty({example: "jonnydonny", description: "Cusomer Username"})
    @Column({
        type: DataType.STRING,
    }) username: string;
    
    @ApiProperty({example: "JhonDoe0990@gmail.com", description: "Cusomer Email"})
    @Column({
        type: DataType.STRING,
    }) email: string;
    
    @ApiProperty({example: "JhonDoe!2345", description: "Cusomer Password"})
    @Column({
        type: DataType.STRING,
    }) hashed_password: string;
    
    @ApiProperty({example: "asdlgahsg)_as;dga!asdajsgaglasgaldgajg", description: "Cusomer Refresh Token"})
    @Column({
        type: DataType.STRING,
    }) hashed_refresh_token: string;
    
    @ApiProperty({example: "+998912210990", description: "Cusomer phone number"})
    @Column({
        type: DataType.STRING,
    }) phone_number: string;
    
    @ApiProperty({example: "AA02370235", description: "Cusomer passport serial number"})
    @Column({
        type: DataType.STRING,
    }) passport_serial_number: string;

    @ApiProperty({example: "Tashkent", description: "Cusomer address"})
    @Column({
        type: DataType.STRING,
    }) address: string;

    @ApiProperty({example: true, description: "Cusomer Status"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    }) status: boolean;

    @Column({
        type: DataType.STRING,
    }) activation_link: string;

    @HasMany(() => CustomerProduct)
    customer_product: CustomerProduct;
}
