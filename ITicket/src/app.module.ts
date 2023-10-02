import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';
import {ConfigModule} from '@nestjs/config';
import { SequelizeModule} from '@nestjs/sequelize';
import { Customer } from './customer/models/customer.model';
import { MailModule } from './mail/mail.module';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { Bot } from './bot/models/bot.model';

const {env} = process;

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [BotModule]
      })
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: 'postgres://gmptutao:x6ekCFQ91d5BCitrCqPj4m1BBp0bc1YI@john.db.elephantsql.com/gmptutao',
      // port:  Number(env.DATABASE_PORT),
      // host: env.DATABASE_HOST,
      // username: env.DATABASE_USER,
      // password: env.DATABASE_PASSWORD,
      // database: env.DATABASE_DB_NAME,
      autoLoadModels: true,
      logging: false,
      models: [
        Customer,
        Bot
      ]
    }),
    CustomerModule, 
    AdminModule, 
    MailModule, BotModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
