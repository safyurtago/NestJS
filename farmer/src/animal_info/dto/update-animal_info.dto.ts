import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalInfoDto } from './create-animal_info.dto';

export class UpdateAnimalInfoDto extends PartialType(CreateAnimalInfoDto) {}
