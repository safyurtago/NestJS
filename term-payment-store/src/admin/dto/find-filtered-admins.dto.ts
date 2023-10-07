import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FindFilteredAdminsDto {
    @ApiProperty({example: 'sfr', description: 'Admin Username'})
    @IsString()
    username?: string;
    @ApiProperty({example: 'asga', description: 'Admin email'})
    @IsString()
    email?: string;
    @ApiProperty({example: 'true', description: 'Admin status'})
    @IsString()
    role?: string;
}