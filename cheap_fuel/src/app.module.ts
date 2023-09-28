import { GasStationFuelType } from './gas-station-fuel-type/models/gas-station-fuel-type.module';
import { GasStationBranch } from './gas-station-branch/models/gas-station-branch.module';
import { FuelType } from './fuel-type/models/fuel-type.module';
import { GasStation } from './gas-station/models/gas-station.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GasStationModule } from './gas-station/gas-station.module';
import { GasStationBranchModule } from './gas-station-branch/gas-station-branch.module';
import { GasStationFuelTypeModule } from './gas-station-fuel-type/gas-station-fuel-type.module';
import { FuelTypeModule } from './fuel-type/fuel-type.module';

const {env} = process;

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }),
  SequelizeModule.forRoot({
    dialect: 'postgres',
    port: Number(env.DB_PORT),
    host: env.DB_HOST,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    models: [GasStation, GasStationBranch, GasStationFuelType, FuelType],
    autoLoadModels: true,
    logging: true
  }),
  GasStationModule,
  GasStationBranchModule,
  GasStationFuelTypeModule,
  FuelTypeModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
