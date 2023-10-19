import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity('product')
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({nullable: true})
  @Column({nullable: true})
  description: string;

  @Field()
  @Column()
  amount: number;

  @Field({nullable: true})
  @Column({nullable: true})
  photo: string;
}
