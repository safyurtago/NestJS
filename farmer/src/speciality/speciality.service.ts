import { Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Speciality, SpecialityDocument } from './schemas/speciality.schema';
import { Model } from 'mongoose';

@Injectable()
export class SpecialityService {
  constructor (@InjectModel(Speciality.name) private specialityModel: Model<SpecialityDocument>) {}


  create(createSpecialityDto: CreateSpecialityDto) {
    return this.specialityModel.create(createSpecialityDto);
  }

  findAll() {
    return this.specialityModel.find().populate('workers');
  }

  findOne(id: number) {
    return ;
  }

  update(id: number, updateSpecialityDto: UpdateSpecialityDto) {
    return `This action updates a #${id} speciality`;
  }

  remove(id: number) {
    return `This action removes a #${id} speciality`;
  }
}
