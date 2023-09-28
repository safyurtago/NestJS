import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { MachineDriverController } from './machine_driver.controller';
import { MachineDriverService } from './machine_driver.service';

@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [MachineDriverController],
  providers: [MachineDriverService]
})
export class MachineDriverModule {}
