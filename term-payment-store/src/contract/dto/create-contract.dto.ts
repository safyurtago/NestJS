import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateContractDto {
    @ApiProperty({example: 2, description: "Customer Id"}) 
    @IsNumberString()
    @IsNotEmpty()
    customer_id: number;

    @ApiProperty({example: 40000, description: "First Payment "})
    @IsNumberString()
    @IsNotEmpty()
    first_payment: number;

    @ApiProperty({example: "", description: "End Date "})
    // @IsDate()
    @IsNotEmpty()
    end_date: Date;

    @ApiProperty({example: "", description: "Mandatory date for payment "})
    // @IsDate()
    @IsNotEmpty()
    mandatory_date: Date;

    @ApiProperty({example: "asdagasgasgagssdgdasg.pdf", description: "Contract File Name "})
    // @IsString()
    // @IsNotEmpty()
    image: any;

}
