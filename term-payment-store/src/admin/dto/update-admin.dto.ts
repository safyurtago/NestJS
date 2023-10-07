import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class UpdateAdminDto  {
    @ApiProperty({example: "jonnydonny", description: "Admin Username"})
    @IsOptional()
    @IsString()
    readonly username?: string;

    @ApiProperty({example: "JhonDoe0990@gmail.com", description: "Admin Email"})
    @IsOptional()
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: "jonnydonny", description: "Admin Username"})
    @IsOptional()
    @IsString()
    readonly role: string;

    @ApiProperty({example: true, description: "Admin status"})
    @IsOptional()
    @IsBoolean()
    readonly status: boolean;
}
