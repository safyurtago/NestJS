import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecordsOfFeedingDto } from './dto/create-records_of_feeding.dto';
import { UpdateRecordsOfFeedingDto } from './dto/update-records_of_feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RecordsOfFeeding, RecordsOfFeedingDocument } from './schemas/records_of_feeding.schema';
import { Model } from 'mongoose';
import { Feeding, FeedingDocument } from '../feeding/schemas/feeding.schema';

@Injectable()
export class RecordsOfFeedingService {
  constructor (
    @InjectModel(RecordsOfFeeding.name) private readonly recordsOfFeedingModel: Model<RecordsOfFeedingDocument>,
    @InjectModel(Feeding.name) private readonly feedingModel: Model<FeedingDocument>,
  ) { }

  async create(createRecordsOfFeedingDto: CreateRecordsOfFeedingDto) {
    const {feeding_id} = createRecordsOfFeedingDto;

    const feeding = await this.feedingModel.findById(feeding_id);
    if (!feeding) throw new BadRequestException('Feeding not found')
    const recordsOfFeeding = await this.recordsOfFeedingModel.create(createRecordsOfFeedingDto);
    feeding.records_of_feeding.push(recordsOfFeeding);
    feeding.save();
    return recordsOfFeeding;
  }

  findAll() {
    return this.recordsOfFeedingModel.find().populate('feeding_id');
  }

  findOne(id: string) {
    return this.recordsOfFeedingModel.findById(id).populate('feeding_id');
  }

  update(id: string, updateRecordsOfFeedingDto: UpdateRecordsOfFeedingDto) {
    return this.recordsOfFeedingModel.findByIdAndUpdate(id, updateRecordsOfFeedingDto, {new: true});
  }

  remove(id: string) {
    return this.recordsOfFeedingModel.findByIdAndRemove(id);
  }
}
