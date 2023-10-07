import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class FindFilteredCustomersDto {
    @ApiProperty({example: 'sfr', description: 'Customer Username'})
    @IsOptional()
    @IsString()
    username?: string;
    @ApiProperty({example: 'asga', description: 'Customer email'})
    @IsOptional()
    @IsString()
    email?: string;
    @ApiProperty({example: 'Tashkent', description: 'Customer address'})
    @IsOptional()
    @IsString()
    address?: string;
    @ApiProperty({example: 'Tashkent', description: 'Customer phone number'})
    @IsOptional()
    @IsNumberString()
    phone_number?: string;
    @ApiProperty({example: 'Jhon', description: 'Customer first name'})
    @IsOptional()
    @IsString()
    first_name?: string;
    @ApiProperty({example: 'Doe', description: 'Customer last name'})
    @IsOptional()
    @IsString()
    last_name?: string;
    @ApiProperty({example: 'AA1241244', description: 'Customer passport seiarl number'})
    @IsOptional()
    @IsString()
    passport_serial_number?: string;
}