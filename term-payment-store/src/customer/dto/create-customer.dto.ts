import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty({example: "Jhon", description: "Customer first name"})
    @IsString()
    @IsNotEmpty()
    readonly first_name: string;

    @ApiProperty({example: "+998912210990", description: "Customer phone number"})
    @IsString()
    @IsNotEmpty()
    readonly phone_number: string;

    @ApiProperty({example: "AA1241412", description: "Customer passport serial number"})
    @IsString()
    @IsNotEmpty()
    readonly passport_serial_number: string;

    @ApiProperty({example: "Tashkent", description: "Customer adress"})
    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @ApiProperty({example: "Doe", description: "Customer last name"})
    @IsString()
    @IsNotEmpty()
    readonly last_name: string;

    @ApiProperty({example: "jonnydonny", description: "Customer Username"})
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({example: "JhonDoe0990@gmail.com", description: "Customer Email"})
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({example: "JhonDoe!2345", description: "Customer Password"})
    @MinLength(6)    
    @IsStrongPassword()
    readonly password: string;

    @ApiProperty({example: "JhonDoe!2345", description: "Customer Password"})
    @MinLength(6)    
    @IsStrongPassword()
    readonly confirm_password: string;
}
