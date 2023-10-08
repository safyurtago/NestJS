import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "../../category/models/category.model";
import { CustomerProduct } from "../../customer_product/models/customer_product.model";

interface IProduct {
    name: string;
    description: string;
    price: number;
    category_id: number;
    status: string;
}

@Table({tableName: "product"})
export class Product extends Model<Product, IProduct> {
    @ApiProperty({example: 1, description: "Unique Id"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }) id: number;

    @ApiProperty({example: "Iron", description: "Product name"})
    @Column({
        type: DataType.STRING,
    }) name: string;
    @ApiProperty({example: "This is Iron", description: "Product description"})
    @Column({ 
        type: DataType.TEXT,
    }) description: string;
    @ApiProperty({example: 5000, description: "Product price"})
    @Column({
        type: DataType.BIGINT,
    }) price: number;
    @ApiProperty({example: 1, description: "Category id"})
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER, onDelete: "CASCADE"
    }) category_id: number;
    @BelongsTo(() => Category)
    category: Category;
    @ApiProperty({example: true, description: "Product status"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    }) status: boolean;

    @HasMany(() => CustomerProduct)
    customer_product: CustomerProduct;
}
