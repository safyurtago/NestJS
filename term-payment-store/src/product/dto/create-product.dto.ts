import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({example: "Iron", description: "Product name"})
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({example: "This is Iron", description: "Product description"})
    @IsString()
    @IsNotEmpty()
    description: string;
    @ApiProperty({example: 5000, description: "Product price"})
    @IsNotEmpty()
    @IsNumber()
    price: number;
    @ApiProperty({example: 1, description: "Category id"})
    @IsNotEmpty()
    @IsNumber()
    category_id: number;
}
