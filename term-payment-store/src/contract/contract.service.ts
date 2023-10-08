import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Contract } from './models/contract.model';
import { CustomerProductService } from '../customer_product/customer_product.service';
import { FilesService } from '../files/files.service';
import { FindContractDto } from './dto/find-contract.dto';
import { Op } from 'sequelize';

@Injectable()
export class ContractService {
  constructor (
    @InjectModel(Contract) private contractRepository: typeof Contract,
    private readonly customerProductService: CustomerProductService,
    private readonly filesService: FilesService
    ) {}

  async create(
    createContractDto: CreateContractDto,
    req: Request,
    image: any,
    ) {
      const file_name = await this.filesService.createFile(image)


    const admin_id = req['admin'].id;
    let total_amount: number = 0;
    const customerProducts = await this.customerProductService.findOneCustomerProdcuts(createContractDto.customer_id)
    
    if (customerProducts.length == 0) {throw new BadRequestException("Customer products not found")}
    
    for( let e of customerProducts) { 
      total_amount += +e['dataValues']['product'].price                      // console.log(customerProducts[0]['dataValues']['product'].price)
    }
    await this.customerProductService.updateCustomerProdcuts(+createContractDto.customer_id)

    const newContract = await this.contractRepository.create({
      ...createContractDto,
      admin_id,
      total_amount: total_amount,
      contract_file: file_name
    })
    return newContract;
  }

  findAll(findContractDto: FindContractDto) {
      let where = {}
      // if (findContractDto.customer_id) where['customer_id'] = findContractDto.customer_id
      return this.contractRepository.findAll({where, include: {all: true}})
  }

  findOne(id: number) {
    return this.contractRepository.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return this.contractRepository.update(
      {...updateContractDto},
      {where: {id}, returning: true}
    )
  }

  remove(id: number) {
    return this.contractRepository.destroy({where: {id}});
  }

  async payment(amount: number, id: number) {
    const contract = await this.findOne(id);
    if (!contract) throw new BadRequestException("Contract not found")
    await this.contractRepository.update(
      {total_amount: contract.total_amount - +amount},
      {where: {id: contract.id}, returning: true}
    )
  }
}
