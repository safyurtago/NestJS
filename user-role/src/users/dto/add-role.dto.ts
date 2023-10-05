import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example: 1, description: 'rolini ozgartirmoqchi bolgan userni id'})
    readonly userId: number;

    @ApiProperty({example: 'ADMIN', description: 'qaysi rolga ozgartirish etish'})
    readonly value: string;
}