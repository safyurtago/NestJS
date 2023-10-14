import { Module } from '@nestjs/common';
import { VaccinationHistoryService } from './vaccination_history.service';
import { VaccinationHistoryController } from './vaccination_history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VaccinationHistory, VaccinationHistorySchema } from './schemas/vaccination_history.schema';
import { Vaccine, VaccineSchema } from '../vaccine/schemas/vaccine.schema';
import { Animal, AnimalSchema } from '../animal/schemas/animal.schema';
import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: VaccinationHistory.name, schema: VaccinationHistorySchema},
      {name: Vaccine.name, schema: VaccineSchema},
      {name: Animal.name, schema: AnimalSchema},
      {name: Worker.name, schema: WorkerSchema},
    ])
  ],
  controllers: [VaccinationHistoryController],
  providers: [VaccinationHistoryService],
})
export class VaccinationHistoryModule {}
