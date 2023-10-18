import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
  @ApiProperty({example: "Jhon", description: "Customer first name"})
  first_name: string;
  @ApiProperty({example: "Doe", description: "Customer last name"})
  last_name: string;
  @ApiProperty({example: "jhonDoe@gmail.com", description: "Customer email"})
  email: string;
  @ApiProperty({example: "+998901234567", description: "Customer phone"})
  phone: string;
  @ApiProperty({example: "@safyurrr", description: "Customer telegram username"})
  telegram_username: string;
  @ApiProperty({example: "JhonDoe!2345 ~ asd;gasga;sg;a;ga0gaw2k2lrf223j23nr", description: "Customer hashed password"})
  password: string;
  @ApiProperty({example: "JhonDoe!2345 ~ asd;gasga;sg;a;ga0gaw2k2lrf223j23nr", description: "Customer hashed password"})
  confirm_password: string;
  @ApiProperty({example: "Wed Oct 18 18:39:47 +05 2023", description: "Customer birthday"})
  birth_date: Date;
  @ApiProperty({example: "male", description: "Customer gender"})
  gender: string;
  @ApiProperty({example: "UZ", description: "Customer language"})
  language: string;
}
