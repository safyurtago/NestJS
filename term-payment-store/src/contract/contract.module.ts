import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contract } from './models/contract.model';
import { Admin } from '../admin/models/admin.model';
import { Customer } from '../customer/models/customer.model';
import { ContractDetail } from '../contract_details/models/contract_detail.model';
import { AdminGuard } from '../guards/admin.guard';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { CustomerProductModule } from '../customer_product/customer_product.module';
import { FilesModule } from '../files/files.module';
import { Payment } from '../payment/models/payment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Contract, Admin, Customer, ContractDetail, Payment]),
    JwtModule.register({}),
    AdminModule,
    CustomerProductModule,
    FilesModule,
  ],
  controllers: [ContractController],
  providers: [ContractService, AdminGuard],
  exports: [ContractService]
})
export class ContractModule {}
