import { ApiProperty } from "@nestjs/swagger";

export class  ActivateUserDto {
    @ApiProperty({example: 1, description: 'activini ozgartirmoqci bolgan userni idsi'})
    userId: number
}