import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class FindContractDto {
    @ApiProperty({example: 2, description: "Customer Id"}) 
    @IsNumberString()
    @IsOptional()
    customer_id: number;

}
