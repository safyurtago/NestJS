import { Machine } from './models/machine.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';

@Module({
  imports: [SequelizeModule.forFeature([Machine])],
  controllers: [MachineController],
  providers: [MachineService]
})
export class MachineModule {}
