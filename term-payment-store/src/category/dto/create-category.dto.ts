import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: "Technology", description: "Category Name"})
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsOptional()
    @IsNumber()
    @ApiProperty({example: 1, description: "Parent Id"})
    parent_id: number;
}
