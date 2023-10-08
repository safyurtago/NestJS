import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindProductDto {
    @ApiProperty({example: "Iron", description: "Product name"})
    @IsOptional()
    @IsString()
    name: string;
    @ApiProperty({example: "This is Iron", description: "Product description"})
    @IsOptional()
    @IsString()
    description: string;
    @ApiProperty({example: 5000, description: "Product price"})
    @IsOptional()
    @IsNumber()
    min_price: number;
    // @IsOptional()
    // @IsNumber()
    // max_price: number;
    @ApiProperty({example: 1, description: "Category id"})
    @IsOptional()
    @IsNumber()
    category_id: number;
}