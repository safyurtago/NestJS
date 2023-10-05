import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICustomer {
    readonly first_name: string;
    readonly last_name: string;
    readonly phone: string;
    readonly hashed_password: string;
    readonly email: string;
    readonly birth_date: Date;
    readonly gender_id: number;
    readonly language_id: number;
    readonly is_active: boolean;
    readonly hashed_refresh_token: string;
    readonly activation_link: string;
}

@Table({tableName: 'customer'})
export class Customer extends Model<Customer, ICustomer> {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;
    @ApiProperty({example: "John", description: 'Customer first name'})
    @Column({
        type: DataType.STRING,
    })
    first_name: string;
    @ApiProperty({example: "Doe", description: 'Customer last name'})
    @Column({
        type: DataType.STRING,
    })
    last_name: string;
    @ApiProperty({example: "+998912210990", description: "Customer Phone Number"})
    @Column({
        type: DataType.STRING,
    })
    phone: string
    @ApiProperty({example: "Qwerty!2345", description: "Customer Password"})
    @Column({
        type: DataType.STRING,
    })
    hashed_password: string
    @ApiProperty({example: "John@gmail.com", description: "Customer email"})
    @Column({
        type: DataType.STRING,
    })
    email: string
    @ApiProperty({example: '1997-21-06', description: "Customer birth date"})
    @Column({
        type: DataType.DATE,
    })
    birth_date: Date
    @ApiProperty({example: 1, description: "Gender Id"})
    @Column({
        type: DataType.INTEGER
    })
    gender_id: number
    @ApiProperty({example: 1, description: "Language Id"})
    @Column({
        type: DataType.INTEGER
    })
    language_id: number
    @ApiProperty({example: true, description: "Status"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean
    @ApiProperty({example: "sagjasgwegaglasg", description: "Hashed refresh token"})
    @Column({
        type: DataType.STRING
    })
    hashed_refresh_token: string
    @Column({
        type: DataType.STRING
    })
    activation_link: string
}
