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
        Admin,
        Customer
      ],
    }),
    AdminModule,
    MailModule,
    CustomerModule
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {}
