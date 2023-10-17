import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMilkProductionDto } from './dto/create-milk_production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MilkProduction, MilkProductionDocument } from './schemas/milk_production.schema';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';

@Injectable()
export class MilkProductionService {
  constructor (
    @InjectModel(MilkProduction.name) private readonly milkProductionModel: Model<MilkProductionDocument>,
    @InjectModel(Animal.name) private readonly animalModel: Model<AnimalDocument>,
  ) {}

  async create(createMilkProductionDto: CreateMilkProductionDto) {
    const {animal_id} = createMilkProductionDto;
    const animal = await this.animalModel.findById(animal_id);
    if (!animal) throw new NotFoundException('Animal not found')
    const milkProduction = await this.milkProductionModel.create(createMilkProductionDto);
    animal.milk_production.push(milkProduction); 
    animal.save();
    return milkProduction;
  }

  findAll() {
    return this.milkProductionModel.find().populate('animal_id');
  }

  findOne(id: string) {
    return this.milkProductionModel.findById(id).populate('animal_id');
  }

  update(id: string, updateMilkProductionDto: UpdateMilkProductionDto) {
    return this.milkProductionModel.findByIdAndUpdate(id, updateMilkProductionDto, {new: true});
  }

  remove(id: string) {
    return this.milkProductionModel.findByIdAndRemove(id);
  }
}
