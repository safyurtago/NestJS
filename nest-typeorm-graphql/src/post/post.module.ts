import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { PostResolver } from './post.resolver';
import { UsersResolver } from '../users/users.resolver';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User])
  ],
  controllers: [PostController],
  providers: [PostService, PostResolver, UsersResolver, UsersService],
})
export class PostModule {}
