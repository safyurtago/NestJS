import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

// CREATE CreateAdminDto
export class CreateAdminDto {
    @ApiProperty({example: "jonnydonny", description: "Admin Username"})
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({example: "JhonDoe0990@gmail.com", description: "Admin Email"})
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({example: "JhonDoe!2345", description: "Admin Password"})
    @MinLength(6)    
    @IsStrongPassword()
    readonly password: string;

    @ApiProperty({example: "JhonDoe!2345", description: "Admin Password"})
    @MinLength(6)    
    @IsStrongPassword()
    readonly confirm_password: string;
}
