import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'user1', description: 'Foydalanuvchi nomi'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'user1@gmail.com', description: 'Foydalanuvchi emaili'})
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Qw!2ERrecx', description: 'Foydalanuvchi paroli'})
    @IsStrongPassword({minLength: 6})
    password: string;
}
