import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateShopDto {
  @Field()
  name: string;
}
