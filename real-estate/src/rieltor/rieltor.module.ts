import { Module } from '@nestjs/common';
import { RieltorService } from './rieltor.service';
import { RieltorController } from './rieltor.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
  ],
  controllers: [RieltorController],
  providers: [RieltorService],
})
export class RieltorModule {}
