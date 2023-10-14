import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Post } from './models/posts.model';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesService } from '../files/files.service';


@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepo: typeof Post,  private readonly fileService: FilesService){}

  async create(createPostDto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepo.create({ ...createPostDto, image: fileName })

    return post;
  }

  async get() {
    return await this.postRepo.findAll()
  }

  async getOne(id: number) {
    return await this.postRepo.findOne({where: {id}})
  }

  async update(id: number, updatePostDto: UpdatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const updatePost = await this.postRepo.update({...updatePostDto, image: fileName}, {where: {id}, returning: true})

    return updatePost[1][0];
  }

  async delete(id: number) {
    return await this.postRepo.destroy({where: {id}});
  }
}