import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerBlockDto } from './create-worker_block.dto';

export class UpdateWorkerBlockDto extends PartialType(CreateWorkerBlockDto) {}
