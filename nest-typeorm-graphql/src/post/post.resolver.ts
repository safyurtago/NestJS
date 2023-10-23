import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersResolver } from '../users/users.resolver';
import { Post } from './entities/post.entity';

@Resolver('post')
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userResolver: UsersResolver,
    ) {}

  @Mutation(() => Post)
  async createPost(
    @Args('createPost') createPostDto: CreatePostDto, 
    @Args('authorId') authorId: number) {
      const author = await this.userResolver.findOneUser(authorId);
      return this.postService.create(createPostDto, author);
  }

  @Query(() => [Post])
  findAllPost() {
    return this.postService.findAll();
  }

  @Query(() => Post)
  findOnePost(@Args('id') id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('id') id: number, @Args('updatePost') updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Mutation(() => Number)
  removePost(@Args('id') id: number) {
    return this.postService.remove(id);
  }
}
