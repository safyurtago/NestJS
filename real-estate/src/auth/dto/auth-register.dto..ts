import { IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class RegisterAuthDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly first_name: string;

    @IsNotEmpty()
    @IsString()
    readonly last_name: string;

    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    readonly phone_number: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}