import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../post/entities/post.entity";


@ObjectType()
@Entity('user')
export class User {
  @Field(() => ID) 
  @PrimaryGeneratedColumn()
  id: number;

  @Field({nullable: true})
  @Column({nullable: true})
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @CreateDateColumn()
  updated_at: Date;

  @OneToMany((type) => Post, (post) => post.author)
  @Field((type) => [Post])
  posts: Post[];
}
