import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Feeding, FeedingDocument } from './schemas/feeding.schema';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';
import { Worker, WorkerDocument } from '../worker/schemas/worker.schema';

@Injectable()
export class FeedingService {
  constructor (
    @InjectModel(Feeding.name) private readonly feedingModel: Model<FeedingDocument>,
    @InjectModel(Worker.name) private readonly workerModel: Model<WorkerDocument>,
    @InjectModel(Animal.name) private readonly animalModel: Model<AnimalDocument>,
    
  ) {}

  async create(createFeedingDto: CreateFeedingDto) {
    const {worker_id, animal_id} = createFeedingDto;

    const worker = await this.workerModel.findById(worker_id);
    if (!worker) throw new BadRequestException('Worker not found')
    const animal = await this.animalModel.findById(animal_id);
    if (!animal) throw new BadRequestException('Animal not found')

    const feeding = await this.feedingModel.create(createFeedingDto);
    worker.feeding.push(feeding);
    worker.save();
    animal.feeding.push(feeding);
    animal.save();
    return feeding;
  }

  findAll() {
    return this.feedingModel.find().populate('worker_id').populate('animal_id').populate('records_of_feeding');
  }

  findOne(id: number) {
    return `This action returns a #${id} feeding`;
  }

  update(id: number, updateFeedingDto: UpdateFeedingDto) {
    return `This action updates a #${id} feeding`;
  }

  remove(id: number) {
    return `This action removes a #${id} feeding`;
  }
}
