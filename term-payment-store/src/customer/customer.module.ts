import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { AdminGuard } from '../guards/admin.guard';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Customer]),
    JwtModule.register({}),
    MailModule,
    AdminModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
