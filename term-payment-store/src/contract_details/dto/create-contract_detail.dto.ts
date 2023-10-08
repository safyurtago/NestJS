import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateContractDetailDto {
    @ApiProperty({example: 2, description: "Contract Id"})
    @IsNumber()
    @IsNotEmpty()
    contract_id: number;

    @ApiProperty({example: "bla bla bla infos ", description: "Info"})
    @IsString()
    @IsNotEmpty()
    info: string;
}
