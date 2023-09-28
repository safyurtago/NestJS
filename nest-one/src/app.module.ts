import { Machine } from './machine/models/machine.module';
import { Driver } from './driver/models/driver.module';
import { Builder } from './builder/models/builder.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyModule } from './company/company.module';
import { Company } from './company/models/company.model';
import { BuilderModule } from './builder/builder.module';
import { MachineModule } from './machine/machine.module';
import { MachineDriverModule } from './machine_driver/machine_driver.module';
import { DriverModule } from './driver/driver.module';

const {env} = process;


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: env.POSTGRES_HOST || 'localhost',
      port: Number(env.POSTGRES_PORT) || 8090,
      username: env.POSTGRES_USER || 'postgres',
      password: env.POSTGRES_PASSWORD || 'admin',
      database: env.POSTGRES_DB_NAME || 'nest_one',
      models: [Company, Builder, Driver, Machine],
      autoLoadModels: true,
      logging: true,
    }),
    CompanyModule,
    BuilderModule,
    MachineModule,
    MachineDriverModule,
    DriverModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
