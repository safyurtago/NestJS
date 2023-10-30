import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { RieltorModule } from './rieltor/rieltor.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    PrismaModule,
    RieltorModule,
    AdminModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}