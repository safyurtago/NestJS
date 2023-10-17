import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordsOfIllnessDto } from './create-records_of_illness.dto';

export class UpdateRecordsOfIllnessDto extends PartialType(CreateRecordsOfIllnessDto) {}
