import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "../../product/models/product.model";

interface ICategory {
    name: string;
    parent_id: number;
}

@Table({tableName: "category"})
export class Category extends Model<Category, ICategory> {
    @ApiProperty({example: 1, description: "Unique Id"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }) id: number;
    @ApiProperty({example: "Technology", description: "Category Name"})
    @Column({
        type: DataType.STRING,
    }) name: string;
    @ApiProperty({example: 1, description: "Parent Id"})
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER, 
        onDelete: "CASCADE",
        defaultValue: 0
    }) parent_id: number;
    @BelongsTo(() => Category)
    parent: Category;
    @HasMany(() => Product)
    products: Product[];
}
