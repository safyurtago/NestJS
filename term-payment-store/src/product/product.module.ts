import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { Category } from '../category/models/category.model';
import { CustomerProduct } from '../customer_product/models/customer_product.model';
import { AdminGuard } from '../guards/admin.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Category, CustomerProduct]),
    JwtModule.register({})
  ],
  controllers: [ProductController],
  providers: [ProductService, AdminGuard],
})
export class ProductModule {}
