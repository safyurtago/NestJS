import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkerBlockDto } from './dto/create-worker_block.dto';
import { UpdateWorkerBlockDto } from './dto/update-worker_block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WorkerBlock, WorkerBlockDocument } from './schemas/worker_block.schema';
import { Model } from 'mongoose';
import { Worker, WorkerDocument } from '../worker/schemas/worker.schema';
import { Block, BlockDocument } from '../block/schemas/block.schema';

@Injectable()
export class WorkerBlockService {
  constructor(
    @InjectModel(WorkerBlock.name) private workerBlockModel: Model<WorkerBlockDocument>, 
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>, 
    @InjectModel(Block.name) private blockModel: Model<BlockDocument>, 
  ) {}


  async create(createWorkerBlockDto: CreateWorkerBlockDto) {
    const {worker_id, block_id} = createWorkerBlockDto;

    const worker = await this.workerModel.findById(worker_id);
    if (!worker) throw new BadRequestException('worker not found');
  
    const block = await this.blockModel.findById(block_id);
    if (!block) throw new BadRequestException('block not found');
    
    const workerBlock = await this.workerBlockModel.create(createWorkerBlockDto);

    worker.worker_blocks.push(workerBlock);
    await worker.save();

    block.worker_blocks.push(workerBlock);
    await block.save();

    return workerBlock;
  }

  findAll() {
    return this.workerBlockModel.find().populate('worker_id').populate('block_id');
  }

  findOne(id: string) {
    return this.workerBlockModel.findById(id).populate('worker_id').populate('block_id');
  }

  update(id: string, updateWorkerBlockDto: UpdateWorkerBlockDto) {
    return this.workerBlockModel.findByIdAndUpdate(id, updateWorkerBlockDto, {new: true});
  }

  remove(id: string) {
    return this.workerBlockModel.findByIdAndDelete(id);
  }
}
