import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './mail/mail.module';
import { Admin } from './admin/models/admin.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/models/customer.model';
import { AdminGuard } from './guards/admin.guard';
import { AdminService } from './admin/admin.service';
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { CustomerProductModule } from './customer_product/customer_product.module';
import { CustomerProduct } from './customer_product/models/customer_product.model';

const {env} = process;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: env.DB_URI,
      autoLoadModels: true,
      logging: false,
      models: [
        Product,
        Admin,
        Customer,
        Category,
        CustomerProduct
      ],
    }),
    AdminModule,
    MailModule,
    CustomerModule,
    CategoryModule,
    ProductModule,
    CustomerProductModule
  ],
  controllers: [],
  providers: [JwtService],
  exports: []
})
export class AppModule {}
