import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Param, Delete, Put } from '@nestjs/common';

import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createPostDto: CreatePostDto, @UploadedFile() image: any) {
    return this.postsService.create(createPostDto, image);
  }

  @Get()
  get() {
    return this.postsService.get()
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.postsService.getOne(id)
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @UploadedFile() image: any) {
    return this.postsService.update(id, updatePostDto, image)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.postsService.delete(id)
  }  
}