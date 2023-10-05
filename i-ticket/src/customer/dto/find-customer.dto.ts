import { ApiProperty } from "@nestjs/swagger";

export class FindCustomerDto {
    @ApiProperty({example: 'Jhon', description: 'First Name'})
    first_name: string;
    @ApiProperty({example: 'Doe', description: 'Last Name'})
    last_name: string;
    @ApiProperty({example: '+998912210990', description: 'Customer Phone Number'})
    phone: string;
    @ApiProperty({example: '1997-12-12', description: 'Birth Date'})
    birth_date: string;
    @ApiProperty({example: 1, description: 'Language Code'})
    language_id: string;
    @ApiProperty({example: '1', description: 'Gender Code'})
    gender_id: string;
}