import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUppercase } from "class-validator";

export class UpdateRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'ROLE QOSHISH'})
    @IsNotEmpty()
    @IsUppercase()
    @IsString()
    value: string;

    @ApiProperty({example: 'Description', description: 'description '})
    @IsNotEmpty()
    @IsString()
    description: string;
}
