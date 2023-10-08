import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { JwtModule } from '@nestjs/jwt';
import { Product } from '../product/models/product.model';
import { AdminGuard } from '../guards/admin.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Product]),
    JwtModule.register({})
  ],
  controllers: [CategoryController],
  providers: [CategoryService, AdminGuard],
})
export class CategoryModule {}
