import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerCardDto {
  @ApiProperty({example: "jhon's card", description: "Card's name"})
  name: string;
  @ApiProperty({example: "+998901234567", description: "Customer phone"})
  phone: string;
  @ApiProperty({example: "9898 1992 1299 1232", description: "Card's serial number"})
  card_serial: bigint;
  @ApiProperty({example: "2023", description: "Card's expire year"})
  year: number;
  @ApiProperty({example: "12", description: "Card's expire month"})
  month: number;
}
