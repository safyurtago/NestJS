import { GasStationFuelType } from './models/gas-station-fuel-type.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { GasStationFuelTypeController } from './gas-station-fuel-type.controller';
import { GasStationFuelTypeService } from './gas-station-fuel-type.service';

@Module({
  imports: [SequelizeModule.forFeature([GasStationFuelType])],
  controllers: [GasStationFuelTypeController],
  providers: [GasStationFuelTypeService]
})
export class GasStationFuelTypeModule {}
