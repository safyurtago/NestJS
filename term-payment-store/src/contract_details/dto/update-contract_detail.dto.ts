import { PartialType } from '@nestjs/swagger';
import { CreateContractDetailDto } from './create-contract_detail.dto';

export class UpdateContractDetailDto extends PartialType(CreateContractDetailDto) {}
