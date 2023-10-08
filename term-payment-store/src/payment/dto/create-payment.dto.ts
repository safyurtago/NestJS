import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
    @ApiProperty({example: 3, description: "contract_id"}) 
    @IsNumber()
    contract_id: number;

    @ApiProperty({example: 4, description: " payment amount"})
    @IsNumber()
    amount: number;

    @ApiProperty({example: "Cash", description: "Paymen method"})
    @IsString()
    payment_method: string;
}
