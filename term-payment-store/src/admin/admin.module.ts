import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { AdminGuard } from '../guards/admin.guard';
import { SuperAdminGuard } from '../guards/super-admin.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    MailModule,
    JwtModule.register({})
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
