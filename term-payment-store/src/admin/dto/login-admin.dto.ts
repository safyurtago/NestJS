import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";


export class LoginAdminDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @MinLength(6)
    @IsStrongPassword()
    password: string;
}