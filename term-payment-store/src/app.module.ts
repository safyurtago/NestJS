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
import { ContractModule } from './contract/contract.module';
import { Contract } from './contract/models/contract.model';
import { ContractDetailsModule } from './contract_details/contract_details.module';
import { ContractDetail } from './contract_details/models/contract_detail.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { FilesModule } from './files/files.module';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/models/payment.model';

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
        CustomerProduct,
        ContractDetail,
        Contract,
        Payment
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static')
    }),
    AdminModule,
    MailModule,
    CustomerModule,
    CategoryModule,
    ProductModule,
    CustomerProductModule,
    ContractModule,
    ContractDetailsModule,
    FilesModule,
    PaymentModule
  ],
  controllers: [],
  providers: [JwtService],
  exports: []
})
export class AppModule {}
