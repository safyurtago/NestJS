import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CustomerCard } from "../../customer_card/models/customer_card.model";
import { CustomerAddress } from "../../customer_address/models/customer_address.model";

enum gender_enum_type {
  male = "male",
  female = "female",
}

interface ICustomer {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly phone: string;
  readonly telegram_username: string;
  readonly hashed_password: string;
  readonly birth_date: string;
  readonly gender: string;
  readonly language: string;
  readonly hashed_refresh_token: string;
  readonly activation_link: string;
}

@Table({tableName: 'customer'})
export class Customer extends Model<Customer, ICustomer> {
  @ApiProperty({example: "235kqnta0fas-293925falsdf1034", description: "Unique identifier for the customer"})
  @Column({ 
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  }) customer_id: string;
  @ApiProperty({example: "Jhon", description: "Customer first name"})
  @Column({
    type: DataType.STRING,
  }) first_name: string;
  @ApiProperty({example: "Doe", description: "Customer last name"})
  @Column({
    type: DataType.STRING,
  }) last_name: string;
  @ApiProperty({example: "jhonDoe@gmail.com", description: "Customer email"})
  @Column({
    type: DataType.STRING,
  }) email: string;
  @ApiProperty({example: "+998901234567", description: "Customer phone"})
  @Column({
    type: DataType.STRING
  }) phone: string;
  @ApiProperty({example: "@safyurrr", description: "Customer telegram_username"})
  @Column({
    type: DataType.STRING
  }) telegram_username: string;
  @ApiProperty({example: "JhonDoe!2345 ~ asd;gasga;sg;a;ga0gaw2k2lrf223j23nr", description: "Customer hashed password"})
  @Column({
    type: DataType.STRING
  }) hashed_password: string;
  @ApiProperty({example: "Wed Oct 18 18:39:47 +05 2023", description: "Customer birthday"})
  @Column({
    type: DataType.DATE
  }) birth_date: Date;
  @ApiProperty({example: "male", description: "Customer gender"})
  @Column({
    type: DataType.ENUM(...Object.values(gender_enum_type))
  }) gender: string;
  @ApiProperty({example: "UZ", description: "Customer language"})
  @Column({
    type: DataType.STRING
  }) language: string;
  @Column({
    type: DataType.STRING
  }) hashed_refresh_token: string;
  @Column({
    type: DataType.STRING
  }) activation_link: string;

  @HasMany(() => CustomerCard)
  customer_cards: CustomerCard[];

  @HasMany(() => CustomerAddress)
  customer_address: CustomerAddress[];
}
