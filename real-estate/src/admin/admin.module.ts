import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from '../common/guards';
import { AccessTokenStrategy, RefreshTokenFromBearerStrategy, RefreshTokenFromCookieStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    AccessTokenStrategy,
    RefreshTokenFromBearerStrategy,
    RefreshTokenFromCookieStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    }
  ],
})
export class AdminModule {}
