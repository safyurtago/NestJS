import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class UpdateCustomerDto  {
    @ApiProperty({example: "jonnydonny", description: "Customer Username"})
    @IsOptional()
    @IsString()
    readonly username?: string;

    @ApiProperty({example: "JhonDoe0990@gmail.com", description: "Customer Email"})
    @IsOptional()
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: "jonnydonny", description: "Customer first name"})
    @IsOptional()
    @IsString()
    readonly first_name: string;

    @ApiProperty({example: "jonnydonny", description: "Customer last name"})
    @IsOptional()
    @IsString()
    readonly last_name: string;

    @ApiProperty({example: "Tashkent", description: "Customer address"})
    @IsOptional()
    @IsString()
    readonly address: string;

    @ApiProperty({example: true, description: "Customer status"})
    @IsOptional()
    @IsBoolean()
    readonly status: boolean;
}
