import { GasStationBranch } from './models/gas-station-branch.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { GasStationBranchController } from './gas-station-branch.controller';
import { GasStationBranchService } from './gas-station-branch.service';

@Module({
  imports: [SequelizeModule.forFeature([GasStationBranch])],
  controllers: [GasStationBranchController],
  providers: [GasStationBranchService]
})
export class GasStationBranchModule {}
