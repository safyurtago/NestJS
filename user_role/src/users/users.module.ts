import { User } from './models/user.model';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/roles/models/role.model';
import { Post } from 'src/posts/models/posts.model';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/models/user-roles.model';

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