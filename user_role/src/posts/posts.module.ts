import { Module } from '@nestjs/common';
import { Post } from './models/posts.model';
import { PostsService } from './posts.service';
import { User } from 'src/users/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsController } from './posts.controller';
import { FilesModule } from 'src/files/files.module';

@Module({
imports: [SequelizeModule.forFeature([User, Post]),
  FilesModule
],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
