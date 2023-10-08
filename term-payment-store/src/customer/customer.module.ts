import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { AdminGuard } from '../guards/admin.guard';
import { AdminModule } from '../admin/admin.module';
import { Contract } from '../contract/models/contract.model';
import { Payment } from '../payment/models/payment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Customer, Contract, Payment]),
    JwtModule.register({}),
    MailModule,
    AdminModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
