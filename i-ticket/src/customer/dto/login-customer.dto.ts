import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword, MinLength } from "class-validator";

export class LoginCustomerDto {
    @ApiProperty({example: 'JhonDoe@gmail.com', description: "Customer email address"})
    @IsEmail()
    readonly email: string;
    @ApiProperty({example: 'JhonDoe)990', description: "Customer Password"})
    @MinLength(6)
    @IsStrongPassword()
    readonly password: string;
}