import { Module } from '@nestjs/common';
import { ContractDetailsService } from './contract_details.service';
import { ContractDetailsController } from './contract_details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractDetail } from './models/contract_detail.model';
import { Contract } from '../contract/models/contract.model';
import { ContractModule } from '../contract/contract.module';
import { AdminGuard } from '../guards/admin.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([ContractDetail, Contract]),
    ContractModule,
    JwtModule.register({}),
  ],
  controllers: [ContractDetailsController],
  providers: [ContractDetailsService, AdminGuard],
})
export class ContractDetailsModule {}
