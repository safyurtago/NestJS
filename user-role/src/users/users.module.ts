import { User } from './models/user.model';
import { UsersService } from './users.service';
import { Role } from '../roles/models/role.model';
import { Post } from '../posts/models/posts.model';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { RolesModule } from '../roles/roles.module';
import { UserRoles } from '../roles/models/user-roles.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    RolesModule, 
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}