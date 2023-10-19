import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateProductDto {
  @Field()
  name: string;

  @Field({nullable: true})
  description: string;

  @Field()
  amount: number;

  @Field({nullable: true})
  photo: string;
}
