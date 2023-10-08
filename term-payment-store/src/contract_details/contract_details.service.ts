import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContractDetailDto } from './dto/create-contract_detail.dto';
import { UpdateContractDetailDto } from './dto/update-contract_detail.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ContractDetail } from './models/contract_detail.model';
import { ContractService } from '../contract/contract.service';

@Injectable()
export class ContractDetailsService {
  constructor (
    @InjectModel(ContractDetail) private contractDetailRepository: typeof ContractDetail,
    private readonly contractService: ContractService
    ) {}
  async create(createContractDetailDto: CreateContractDetailDto) {
    const contract = await this.contractService.findOne(createContractDetailDto.contract_id)

    const findContracDetail = await this.contractDetailRepository.findOne({where: {contract_id: createContractDetailDto.contract_id}})
    if (findContracDetail) throw new BadRequestException('Contract detail already exists')

    const newContractDetail = await this.contractDetailRepository.create({
      ...createContractDetailDto,
      total_amount: contract.total_amount
    })
    return newContractDetail;
  }

  findAll() {
    return this.contractDetailRepository.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.contractDetailRepository.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateContractDetailDto: UpdateContractDetailDto) {
    return this.contractDetailRepository.update(
      {...updateContractDetailDto},
      {where: {id}, returning: true}
    );
  }

  remove(id: number) {
  return this.contractDetailRepository.destroy({where: {id}});
  }
}
