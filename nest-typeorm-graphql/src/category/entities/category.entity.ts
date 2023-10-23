import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@ObjectType()
@Entity('category')
export class Category {
  @Field(() => ID) 
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany((type) => Product, (product) => product.category)
  @Field((type) => [Product])
  products: Product[];
}
