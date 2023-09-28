import { FuelType } from './models/fuel-type.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { FuelTypeController } from './fuel-type.controller';
import { FuelTypeService } from './fuel-type.service';

@Module({
  imports: [SequelizeModule.forFeature([FuelType])],
  controllers: [FuelTypeController],
  providers: [FuelTypeService]
})
export class FuelTypeModule {}
