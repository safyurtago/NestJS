import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnimalTypeDto } from './dto/create-animal_type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalType, AnimalTypeDocument } from './schemas/animal_type.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnimalTypeService {
  constructor (@InjectModel(AnimalType.name) private animalTypeModel: Model<AnimalTypeDocument>) {}

  async create(createAnimalTypeDto: CreateAnimalTypeDto) {
    const animal_type = await this.animalTypeModel.findOne({type_name: createAnimalTypeDto.type_name});
    
    if (animal_type) throw new BadRequestException('Animal type already exists')
    return this.animalTypeModel.create(createAnimalTypeDto);
  }

  findAll() {
    return this.animalTypeModel.find().populate('animals');
  }

  findOne(id: string) {
    return this.animalTypeModel.findById(id).populate('animals');
  }

  update(id: string, updateAnimalTypeDto: UpdateAnimalTypeDto) {
    return this.animalTypeModel.findByIdAndUpdate(id, updateAnimalTypeDto, {new: true});
  }

  remove(id: string) {
    return this.animalTypeModel.findByIdAndDelete(id);
  }
}
