import { Module } from '@nestjs/common';
import { Post } from './models/posts.model';
import { PostsService } from './posts.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { PostsController } from './posts.controller';
import { FilesModule } from '../files/files.module';
import { User } from '../users/models/user.model';

@Module({
imports: [SequelizeModule.forFeature([User, Post]),
  FilesModule
],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
