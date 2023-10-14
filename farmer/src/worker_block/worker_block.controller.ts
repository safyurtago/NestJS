import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkerBlockService } from './worker_block.service';
import { CreateWorkerBlockDto } from './dto/create-worker_block.dto';
import { UpdateWorkerBlockDto } from './dto/update-worker_block.dto';

@Controller('worker-block')
export class WorkerBlockController {
  constructor(private readonly workerBlockService: WorkerBlockService) {}

  @Post()
  create(@Body() createWorkerBlockDto: CreateWorkerBlockDto) {
    return this.workerBlockService.create(createWorkerBlockDto);
  }

  @Get()
  findAll() {
    return this.workerBlockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerBlockService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerBlockDto: UpdateWorkerBlockDto) {
    return this.workerBlockService.update(id, updateWorkerBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workerBlockService.remove(id);
  }
}
