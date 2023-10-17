import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeatProductionDto } from './dto/create-meat_production.dto';
import { UpdateMeatProductionDto } from './dto/update-meat_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MeatProduction, MeatProductionDocument } from './schemas/meat_production.schema';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';

@Injectable()
export class MeatProductionService {
  constructor (
    @InjectModel(MeatProduction.name) private readonly meatProductionModel: Model<MeatProductionDocument>, 
    @InjectModel(Animal.name) private readonly animalModel: Model<AnimalDocument>, 
  ) {}

  async create(createMeatProductionDto: CreateMeatProductionDto) {
    const {animal_id} = createMeatProductionDto;
    const animal = await this.animalModel.findById(animal_id);
    if (!animal) { throw new NotFoundException('Animal not found'); }
    const meatProduction = await this.meatProductionModel.create(createMeatProductionDto);
    animal.meat_production.push(meatProduction);
    animal.save();
    return meatProduction;
  }

  findAll() {
    return this.meatProductionModel.find().populate('animal_id');
  }

  findOne(id: string) {
    return this.meatProductionModel.findById(id).populate('animal_id');
  }

  update(id: string, updateMeatProductionDto: UpdateMeatProductionDto) {
    return this.meatProductionModel.findByIdAndUpdate(id, updateMeatProductionDto, {new: true});
  }

  remove(id: string) {
    return this.meatProductionModel.findByIdAndRemove(id);
  }
}
