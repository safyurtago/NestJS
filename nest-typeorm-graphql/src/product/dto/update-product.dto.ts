import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class UpdateProductDto {
  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  description?: string;

  @Field({nullable: true})
  amount?: number;

  @Field({nullable: true})
  photo?: string;
}
