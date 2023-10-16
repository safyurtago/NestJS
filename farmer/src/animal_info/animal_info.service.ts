import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnimalInfoDto } from './dto/create-animal_info.dto';
import { UpdateAnimalInfoDto } from './dto/update-animal_info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalInfo, AnimalInfoDocument } from './schemas/animal_info.schema';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';
import { Block, BlockDocument } from '../block/schemas/block.schema';

@Injectable()
export class AnimalInfoService {
  constructor (
    @InjectModel(AnimalInfo.name) private readonly animalInfoModel: Model<AnimalInfoDocument>,
    @InjectModel(Animal.name) private readonly animalModel: Model<AnimalDocument>,
    @InjectModel(Block.name) private readonly blockModel: Model<BlockDocument>,
  ) {}

  async create(createAnimalInfoDto: CreateAnimalInfoDto) {
    const {block_id, animal_id} = createAnimalInfoDto;
    const animal = await this.animalModel.findById(animal_id);
    if (!animal) { throw new BadRequestException('Animal not found') }
    const block = await this.blockModel.findById(block_id);
    if (!block) { throw new BadRequestException('Block not found') }
    const animalInfo = await this.animalInfoModel.create(createAnimalInfoDto);
    animal.animal_info.push(animalInfo);
    animal.save();
    block.animal_info.push(animalInfo);
    block.save();
    return animalInfo;
  }

  findAll() {
    return this.animalInfoModel.find().populate('animal_id').populate('block_id');
  }

  findOne(id: string) {
    return this.animalInfoModel.findById(id).populate('animal_id').populate('block_id');
  }

  update(id: string, updateAnimalInfoDto: UpdateAnimalInfoDto) {
    return this.animalInfoModel.findByIdAndUpdate(id, updateAnimalInfoDto, {new: true});
  }

  remove(id: string) {
    return this.animalInfoModel.findByIdAndRemove(id);
  }
}
