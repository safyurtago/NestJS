import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator"

export class CreateCustomerDto {

    @ApiProperty({example: "John", description: "Customer First Name"})
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({example: "Doe", description: "Customer Last Name"})
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({example: "+998912210990", description: "Customer phone number"})
    @IsPhoneNumber("UZ")
    @IsNotEmpty()
    phone: string;
    
    @ApiProperty({example: "John@gmail.com", description: "Customer email"})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: "JohnDoePassword", description: "Customer password"})
    @MinLength(6)
    @IsStrongPassword()
    password: string;

    @ApiProperty({example: "JohnDoePassword", description: "Customer password"})
    @MinLength(6)
    @IsStrongPassword()
    confirm_password: string;

    @ApiProperty({example: "+998912210990", description: "Customer phone number"})
    @IsString()
    @IsNotEmpty()
    birth_date: Date;

    @ApiProperty({example: "+998912210990", description: "Customer phone number"})
    @IsNumber()
    @IsNotEmpty()
    gender_id: number;

    @ApiProperty({example: "+998912210990", description: "Customer phone number"})
    @IsNumber()
    @IsNotEmpty()
    language_id: number;
}
