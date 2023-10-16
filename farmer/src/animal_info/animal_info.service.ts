import { Injectable } from '@nestjs/common';
import { CreateAnimalInfoDto } from './dto/create-animal_info.dto';
import { UpdateAnimalInfoDto } from './dto/update-animal_info.dto';

@Injectable()
export class AnimalInfoService {
  create(createAnimalInfoDto: CreateAnimalInfoDto) {
    return 'This action adds a new animalInfo';
  }

  findAll() {
    return `This action returns all animalInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animalInfo`;
  }

  update(id: number, updateAnimalInfoDto: UpdateAnimalInfoDto) {
    return `This action updates a #${id} animalInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} animalInfo`;
  }
}
