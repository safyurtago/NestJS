import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vaccine, VaccineDocument } from './schemas/vaccine.schema';
import { Model } from 'mongoose';

@Injectable()
export class VaccineService {
  constructor (@InjectModel(Vaccine.name) private readonly vaccineModel: Model<VaccineDocument>) {}

  async create(createVaccineDto: CreateVaccineDto) {
    const vaccine = await this.vaccineModel.findOne({name: createVaccineDto.name})
    if (vaccine) throw new BadRequestException('Vaccine already exists')
    return this.vaccineModel.create(createVaccineDto);
  }

  findAll() {
    return this.vaccineModel.find().populate('vaccination_history');
  }

  findOne(id: string) {
    return this.vaccineModel.findById(id).populate('vaccination_history');
  }

  update(id: string, updateVaccineDto: UpdateVaccineDto) {
    return this.vaccineModel.findByIdAndUpdate(id, updateVaccineDto, {new: true});
  }

  remove(id: string) {
    return this.vaccineModel.findByIdAndRemove(id);
  }
}
