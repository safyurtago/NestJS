import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { Contract } from '../contract/models/contract.model';
import { Customer } from '../customer/models/customer.model';
import { JwtModule } from '@nestjs/jwt';
import { CustomerGuard } from '../guards/customer.guard';
import { ContractModule } from '../contract/contract.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Payment, Contract, Customer]),
    JwtModule.register({}),
    ContractModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, CustomerGuard],
})
export class PaymentModule {}
