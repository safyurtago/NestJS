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
import { AnimalInfoModule } from './animal_info/animal_info.module';
import { FeedingModule } from './feeding/feeding.module';
import { RecordsOfFeedingModule } from './records_of_feeding/records_of_feeding.module';
import { MeatProductionModule } from './meat_production/meat_production.module';
import { FiberProductionModule } from './fiber_production/fiber_production.module';
import { MilkProductionModule } from './milk_production/milk_production.module';
import { RecordsOfIllnessModule } from './records_of_illness/records_of_illness.module';



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
    AnimalInfoModule,
    FeedingModule,
    RecordsOfFeedingModule,
    MeatProductionModule,
    FiberProductionModule,
    MilkProductionModule,
    RecordsOfIllnessModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
