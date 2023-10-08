import { Module } from '@nestjs/common';
import { CustomerProductService } from './customer_product.service';
import { CustomerProductController } from './customer_product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerProduct } from './models/customer_product.model';
import { Customer } from '../customer/models/customer.model';
import { Product } from '../product/models/product.model';

@Module({
  imports: [
    SequelizeModule.forFeature([CustomerProduct, Customer, Product])
  ],
  controllers: [CustomerProductController],
  providers: [CustomerProductService],
  exports: [CustomerProductService]
})
export class CustomerProductModule {}
