import { Module } from '@nestjs/common';
import { FeedingService } from './feeding.service';
import { FeedingController } from './feeding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feeding, FeedingSchema } from './schemas/feeding.schema';
import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';
import { Animal, AnimalSchema } from '../animal/schemas/animal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Feeding.name, schema: FeedingSchema},
      {name: Worker.name, schema: WorkerSchema},
      {name: Animal.name, schema: AnimalSchema},
    ])
  ],
  controllers: [FeedingController],
  providers: [FeedingService],
})
export class FeedingModule {}
