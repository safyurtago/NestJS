import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserRoles } from "../../roles/models/user-roles.model";
import { Role } from "../../roles/models/role.model";
import { Post } from "../../posts/models/posts.model";

interface IUser{
    name: string;
    email: string;
    password: string;
}
@Table({tableName: 'users'})
export class User extends Model<User, IUser>{
    @ApiProperty({example: 1, description: 'Unikal ID'})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'example@gmail.com', description: 'Email'})
    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true 
    })
    email: string
    @ApiProperty({example: 'example@gmail.com', description: 'Email'})
    @Column({
        type: DataType.STRING,
        allowNull: true,
        // unique: true 
    })
    name: string

    @ApiProperty({example: '123QWER!@qwe', description: 'password'})
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    password: string

    @ApiProperty({example: true, description: 'is active'})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[];
}
