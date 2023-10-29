import { PartialType } from '@nestjs/mapped-types';
import { CreateRieltorDto } from './create-rieltor.dto';

export class UpdateRieltorDto extends PartialType(CreateRieltorDto) {}
