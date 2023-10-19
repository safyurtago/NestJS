import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateShopDto {
  @Field({nullable: true})
  name?: string;
}
