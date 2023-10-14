import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Block, BlockDocument } from './schemas/block.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlockService {
  constructor (
    @InjectModel(Block.name) private blockModel: Model<BlockDocument>
  ) {}

  create(createBlockDto: CreateBlockDto) {
    return this.blockModel.create(createBlockDto);
  }

  findAll() {
    return this.blockModel.find().populate('worker_blocks');
  }

  findOne(id: string) {
    return this.blockModel.findById(id).populate('worker_blocks');
  }

  update(id: string, updateBlockDto: UpdateBlockDto) {
    return this.blockModel.findByIdAndUpdate(id, updateBlockDto, {new: true});
  }

  remove(id: string) {
    return this.blockModel.findByIdAndDelete(id);
  }
}
