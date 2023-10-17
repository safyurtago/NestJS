import { Module } from '@nestjs/common';
import { RecordsOfIllnessService } from './records_of_illness.service';
import { RecordsOfIllnessController } from './records_of_illness.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordsOfIllness, RecordsOfIllnessSchema } from './schemas/records_of_illness.schema';
import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';
import { Animal, AnimalSchema } from '../animal/schemas/animal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: RecordsOfIllness.name, schema: RecordsOfIllnessSchema},
      {name: Animal.name, schema: AnimalSchema},
      {name: Worker.name, schema: WorkerSchema},
    ])
  ],
  controllers: [RecordsOfIllnessController],
  providers: [RecordsOfIllnessService],
})
export class RecordsOfIllnessModule {}
