import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFiberProductionDto } from './dto/create-fiber_production.dto';
import { UpdateFiberProductionDto } from './dto/update-fiber_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FiberProduction, FiberProductionDocument } from './schemas/fiber_production.schema';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';

@Injectable()
export class FiberProductionService {
  constructor (
    @InjectModel(FiberProduction.name) private readonly fiberProductionModel: Model<FiberProductionDocument>,
    @InjectModel(Animal.name) private readonly animalModel: Model<AnimalDocument>,
  ) {}

  async create(createFiberProductionDto: CreateFiberProductionDto) {
    const {animal_id} = createFiberProductionDto;
    const animal = await this.animalModel.findById(animal_id);
    if(!animal) { throw new BadRequestException('animal not found'); }
    const fiberProduction = await this.fiberProductionModel.create(createFiberProductionDto);
    animal.fiber_production.push(fiberProduction);
    animal.save();
    return fiberProduction;
  }

  findAll() {
    return this.fiberProductionModel.find().populate('animal_id');
  }

  findOne(id: number) {
    return this.fiberProductionModel.findById(id).populate('animal_id');
  }

  update(id: number, updateFiberProductionDto: UpdateFiberProductionDto) {
    return this.fiberProductionModel.findByIdAndUpdate(id, updateFiberProductionDto, {new: true});
  }

  remove(id: number) {
    return this.fiberProductionModel.findByIdAndRemove(id);
  }
}
