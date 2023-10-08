import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class FindCustomerProductDto {
    @ApiProperty({example: 1, description: "Product Id"})
    @IsOptional()
    @IsNumber()
    product_id: number;
}
