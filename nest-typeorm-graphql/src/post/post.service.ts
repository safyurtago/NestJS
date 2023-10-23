import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto, author: User) {
    const newPost = this.postRepo.create({...createPostDto, author})
    return this.postRepo.save(newPost);
  }

  findAll() {
    return this.postRepo.find({relations: ['author'] });
  }

  findOne(id: number) {
    return this.postRepo.findOne({where: {id}, relations: ['author']});
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepo.update(id, {...updatePostDto});
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.postRepo.delete(id);
    return id;
  }
}
