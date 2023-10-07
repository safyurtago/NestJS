import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

// CREATE Admin Interface
interface IAdmin {
    readonly username: string;
    readonly email: string;
    readonly hashed_password: string;
    readonly hashed_refresh_token: string;
    readonly status: boolean;
    readonly role: string;
}

// CREATE Role Column enum type
enum ColumnRoleEnum {
    admin = "ADMIN",
    superadmin = "SUPERADMIN"
}

// CREATE TABLE admin
@Table({tableName: "admin"})
export class Admin extends Model<Admin, IAdmin> {
    @ApiProperty({example: 1, description: "Unique ID"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }) id: string;

    @ApiProperty({example: "jonnydonny", description: "Admin Username"})
    @Column({
        type: DataType.STRING,
    }) username: string;

    @ApiProperty({example: "JhonDoe0990@gmail.com", description: "Admin Email"})
    @Column({
        type: DataType.STRING,
    }) email: string;

    @ApiProperty({example: "JhonDoe!2345", description: "Admin Password"})
    @Column({
        type: DataType.STRING,
    }) hashed_password: string;

    @ApiProperty({example: "asdlgahsg)_as;dga!asdajsgaglasgaldgajg", description: "Admin Refresh Token"})
    @Column({
        type: DataType.STRING,
    }) hashed_refresh_token: string;

    @ApiProperty({example: true, description: "Admin Status"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    }) status: boolean;

    @ApiProperty({example: 'ADMIN', description: "Admin Role"})
    @Column({
        type: DataType.ENUM(...Object.values(ColumnRoleEnum)),
        defaultValue: ColumnRoleEnum.admin,
    }) role: string;
    @Column({
        type: DataType.STRING,
    }) activation_link: string;
}
