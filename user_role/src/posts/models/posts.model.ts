import { User } from "src/users/models/user.model";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface IPost {
    title: string;
    content: string;
    image: string;
    userId: number;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, IPost> {
    
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    content: string;

    @Column({ type: DataType.STRING })
    image: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
    userId: number

    @BelongsTo(() => User)
    author: User;
}