import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './models/customer.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Customer]),
    JwtModule.register({
      // global: true,
      // secret: 'JwtSecretKeyDoNotExist',
      // signOptions: {expiresIn: '24h'}
    }),
    MailModule
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class CustomerModule {}
