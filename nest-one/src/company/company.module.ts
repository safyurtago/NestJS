import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from './models/company.model';
import { Builder } from 'src/builder/models/builder.module';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule {}