import { Module } from '@nestjs/common';
import { AnimalInfoService } from './animal_info.service';
import { AnimalInfoController } from './animal_info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalInfo, AnimalInfoSchema } from './schemas/animal_info.schema';
import { Block, BlockSchema } from '../block/schemas/block.schema';
import { Animal, AnimalSchema } from '../animal/schemas/animal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: AnimalInfo.name, schema: AnimalInfoSchema},
      {name: Block.name, schema: BlockSchema},
      {name: Animal.name, schema: AnimalSchema},
    ])
  ],
  controllers: [AnimalInfoController],
  providers: [AnimalInfoService],
})
export class AnimalInfoModule {}
