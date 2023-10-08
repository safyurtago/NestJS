import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Customer } from "../../customer/models/customer.model";
import { Product } from "../../product/models/product.model";

interface ICustomerProduct {
    customer_id: number,
    product_id: number,
    status: boolean
}

@Table({tableName: "customer_product"})
export class CustomerProduct extends Model<CustomerProduct, ICustomerProduct> {
    @ApiProperty({example: 1, description: "Unique Id"}) 
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }) id: number;
    @ApiProperty({example: 1, description: "Customer Id"})
    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER,
        onDelete: "CASCADE",
    }) customer_id: number;
    @BelongsTo(() => Customer)
    customer: Customer;
    @ApiProperty({example: 1, description: "Product Id"})
    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        onDelete: "CASCADE",
    }) product_id: number;
    @BelongsTo(() => Product)
    product: Product;
    @ApiProperty({example: true, description: "Customer Product status"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    }) status: boolean;
}
