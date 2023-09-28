import { District } from './district/models/district.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';
import { User } from './users/models/user.model';
import { UsersModule } from './users/users.module';
import { ComfortModule } from './comfort/comfort.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { Comfort } from './comfort/models/comfort.model';
import { Region } from './region/models/region.model';
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category.model';
import { MailModule } from './mail/mail.module';
import { UserWalletModule } from './user_wallet/user_wallet.module';
import { UserWallet } from './user_wallet/models/user_wallet.model';
import { UserCardModule } from './user_card/user_card.module';
import { CommentModule } from './comment/comment.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';

const {env} = process;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: Number(env.DATABASE_PORT),
      host: env.DATABASE_HOST,
      username: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_DB_NAME,
      models: [
        Admin,
        User,
        Comfort,
        Region,
        District,
        Category,
        UserWallet,
      ],
      autoLoadModels: true,
      logging: false
    }),
    UsersModule,
    ComfortModule,
    RegionModule,
    DistrictModule,
    CategoryModule,
    MailModule,
    UserWalletModule,
    UserCardModule,
    CommentModule,
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
