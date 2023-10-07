import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";


export class LoginCustomerDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @MinLength(6)
    @IsStrongPassword()
    password: string;
}