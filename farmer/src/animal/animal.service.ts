import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from './schemas/animal.schema';
import { Model } from 'mongoose';
import { AnimalType, AnimalTypeDocument } from '../animal_type/schemas/animal_type.schema';

@Injectable()
export class AnimalService {
  constructor (
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(AnimalType.name) private animalTypeModel: Model<AnimalTypeDocument>,
  ) {}


  async create(createAnimalDto: CreateAnimalDto) {
    const {animal_type_id} = createAnimalDto;
    const animal_type = await this.animalTypeModel.findById(animal_type_id);
    if (!animal_type) { throw new BadRequestException('Animal type not found') }

    const findAnimal = await this.animalModel.findOne({name: createAnimalDto.name });
    if (findAnimal) throw new BadRequestException('Animal name already exists')

    const animal = await this.animalModel.create(createAnimalDto);
    animal_type.animals.push(animal);
    animal_type.save();
    return animal;
  }

  findAll() {
    return this.animalModel.find().populate('animal_type_id');
  }

  findOne(id: string) {
    return this.animalModel.findById(id).populate('animal_type_id');
  }

  update(id: string, updateAnimalDto: UpdateAnimalDto) {
    return this.animalModel.findByIdAndUpdate(id, updateAnimalDto, {new: true});
  }

  remove(id: string) {
    return this.animalModel.findByIdAndDelete(id);
  }
}
