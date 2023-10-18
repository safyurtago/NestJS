import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/models/customer.model';
import { CustomerCardModule } from './customer_card/customer_card.module';
import { CustomerAddressModule } from './customer_address/customer_address.module';
import { CustomerCard } from './customer_card/models/customer_card.model';
import { CustomerAddress } from './customer_address/models/customer_address.model';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.DB_URL,
      autoLoadModels: true,
      logging: false,
      models: [
        Customer,
        CustomerCard,
        CustomerAddress
      ],
    }),
    CustomerModule,
    CustomerCardModule,
    CustomerAddressModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
