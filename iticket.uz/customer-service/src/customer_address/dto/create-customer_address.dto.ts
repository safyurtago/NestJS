import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerAddressDto {
  @ApiProperty({example: "USA", description: "Country name"})
  country: string;
  @ApiProperty({example: "Minnesota", description: "Region name"})
  region: string;
  @ApiProperty({example: "minnesota", description: "District name"})
  district: string;
  @ApiProperty({example: "black street", description: "street name"})
  street: string;
  @ApiProperty({example: "272B", description: "house name"})
  house: string;
  @ApiProperty({example: "1241.14214 12321. 12421", description: "location (lat, lan)"})
  location: string;
  @ApiProperty({example: "132142", description: "Poat Index"})
  post_index: string;
  @ApiProperty({example: "bla bla bla bla", description: "address info"})
  info: string;
}
