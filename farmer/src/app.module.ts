import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { WorkerModule } from './worker/worker.module';
import { SpecialityModule } from './speciality/speciality.module';
import { BlockModule } from './block/block.module';
import { WorkerBlockModule } from './worker_block/worker_block.module';
import { AnimalTypeModule } from './animal_type/animal_type.module';
import { AnimalModule } from './animal/animal.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { VaccinationHistoryModule } from './vaccination_history/vaccination_history.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AdminModule,
    WorkerModule,
    SpecialityModule,
    BlockModule,
    WorkerBlockModule,
    AnimalTypeModule,
    AnimalModule,
    VaccineModule,
    VaccinationHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
