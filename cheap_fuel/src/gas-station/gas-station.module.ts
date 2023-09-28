import { GasStation } from './models/gas-station.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { GasStationController } from './gas-station.controller';
import { GasStationService } from './gas-station.service';

@Module({
  imports: [SequelizeModule.forFeature([GasStation]),],
  controllers: [GasStationController],
  providers: [GasStationService]
})
export class GasStationModule {}
