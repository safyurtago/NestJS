import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordsOfIllnessDto } from './dto/create-records_of_illness.dto';
import { UpdateRecordsOfIllnessDto } from './dto/update-records_of_illness.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RecordsOfIllness, RecordsOfIllnessDocument } from './schemas/records_of_illness.schema';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';
import { Worker, WorkerDocument } from '../worker/schemas/worker.schema';

@Injectable()
export class RecordsOfIllnessService {
  constructor (
    @InjectModel(RecordsOfIllness.name) private recordsOfIllnessModel: Model<RecordsOfIllnessDocument>,
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>,
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
  ) {}

  async create(createRecordsOfIllnessDto: CreateRecordsOfIllnessDto) {
    const {animal_id, worker_id} = createRecordsOfIllnessDto;

    const animal = await this.animalModel.findById(animal_id);
    if (!animal) throw new NotFoundException('Animal not found')
    const worker = await this.workerModel.findById(worker_id);
    if (!worker) throw new NotFoundException('Worker not found')

    const recordsOfIllness = await this.recordsOfIllnessModel.create(createRecordsOfIllnessDto);
    animal.records_of_illness.push(recordsOfIllness);
    animal.save();
    worker.records_of_illness.push(recordsOfIllness);
    worker.save();
    return recordsOfIllness;
  }

  findAll() {
    return this.recordsOfIllnessModel.find().populate('animal_id').populate('worker_id');
  }

  findOne(id: string) {
    return this.recordsOfIllnessModel.findById(id).populate('animal_id').populate('worker_id');
  }

  update(id: string, updateRecordsOfIllnessDto: UpdateRecordsOfIllnessDto) {
    return this.recordsOfIllnessModel.findByIdAndUpdate(id, updateRecordsOfIllnessDto, {new: true});
  }

  remove(id: string) {
    return this.recordsOfIllnessModel.findByIdAndRemove(id);
  }
}
