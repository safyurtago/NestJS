import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('category')
export class Category {
  @Field(() => ID) 
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;
}
