import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/user.model";
import { UserRoles } from "./user-roles.model";
import { ApiProperty } from "@nestjs/swagger";

interface IRole {
    value: string;
    description: string;
}
@Table({tableName: 'roles'})
export class Role extends Model<Role, IRole> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'ADMIN', description: 'Unique Role'})
    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true 
    })
    value: string
     
    @ApiProperty({example: 'Description role', description: 'Description role'})
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    description: string

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}
