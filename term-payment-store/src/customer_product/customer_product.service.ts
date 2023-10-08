import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerProductDto } from './dto/create-customer_product.dto';
import { UpdateCustomerProductDto } from './dto/update-customer_product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerProduct } from './models/customer_product.model';
import { FindCustomerProductDto } from './dto/find-customer_product.dto';

@Injectable()
export class CustomerProductService {
  constructor (@InjectModel(CustomerProduct) private customerProductRepository: typeof CustomerProduct) {}

  async create(createCustomerProductDto: CreateCustomerProductDto, req: Request) {
    const customer_id: number = req['customer'].id;
    const findCustomerProduct = await this.customerProductRepository.findOne({where: {
      product_id: createCustomerProductDto.product_id,
      customer_id,
      status: true
    }})
    if (findCustomerProduct) { throw new BadRequestException('Customer product already exists')}
    const customerProduct = {
      ...createCustomerProductDto,
      customer_id
    }
    const newCustomerProduct = await this.customerProductRepository.create(customerProduct)
    return newCustomerProduct;
  }

  findAll(
    findCustomerProduct: FindCustomerProductDto,
    req: Request
  ) {
    const customer_id: number = req['customer'].id;
    let where = {}
    where['customer_id'] = customer_id
    if (findCustomerProduct.product_id) {
      where = {
        ...where,
        product_id: findCustomerProduct.product_id
      }
    } 

    return this.customerProductRepository.findAll({where, include: {all: true}});
  }

  findOne(id: number) {
    return this.customerProductRepository.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateCustomerProductDto: UpdateCustomerProductDto) {
    return this.customerProductRepository.update(
      {...updateCustomerProductDto},
      {where: {id}, returning: true}
    );
  }

  remove(id: number) {
    return this.customerProductRepository.destroy({where: {id}});
  }

  findOneCustomerProdcuts(id: number) {
    return this.customerProductRepository.findAll({where: {customer_id: id, status: true}, include: {all: true}});
  }

  updateCustomerProdcuts(id: number, ) {
    return this.customerProductRepository.update(
      {status: false},
      {where: {customer_id: id, status: true}}
    )
  }
 
}
