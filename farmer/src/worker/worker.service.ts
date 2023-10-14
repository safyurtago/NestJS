import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Worker, WorkerDocument } from './schemas/worker.schema';
import { Model } from 'mongoose';
import { Speciality, SpecialityDocument } from '../speciality/schemas/speciality.schema';

@Injectable()
export class WorkerService {
  constructor (
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>,
    @InjectModel(Speciality.name) private specialityModel: Model<SpecialityDocument>,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    const {speciality_id} = createWorkerDto;
    const  speciality = await this.specialityModel.findById(speciality_id);
    if (!speciality) {
      throw new BadRequestException('Speciality not found')
    }
    
    const worker = await this.workerModel.create(createWorkerDto);
    
    speciality.workers.push(worker);
    await speciality.save();
    return worker;
  }

  findAll() {
    return this.workerModel.find().populate('speciality_id').populate('worker_blocks');
  }

  findOne(id: string) {
    return this.workerModel.findById(id).populate('speciality_id').populate('worker_blocks');
  }

  update(id: string, updateWorkerDto: UpdateWorkerDto) {
    return this.workerModel.findByIdAndUpdate(id, updateWorkerDto, {new: true});
  }

  remove(id: string) {
    return this.workerModel.findByIdAndDelete(id);
  }
}
