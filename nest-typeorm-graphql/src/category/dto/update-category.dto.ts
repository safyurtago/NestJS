import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCategoryDto {
  @Field({nullable: true})
  name?: string;
}
