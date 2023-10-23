import { Field, InputType, Int } from "@nestjs/graphql";
import { Category } from "../../category/entities/category.entity";


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

  @Field((type) => Int, {nullable: true})
  category: Category;
}
