import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FindProductDto } from './dto/find-product.dto';
import { Op } from 'sequelize';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productRepository: typeof Product) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.findOne({where: {name: createProductDto.name}})
    if (product) { throw new BadRequestException('Product already exists')}
    return this.productRepository.create(createProductDto);
  }

  async findAll(findProductDto: FindProductDto) {
    let where = {}

    if (findProductDto.name) { where['name'] = { [Op.like]: `%${findProductDto.name}%`}}
    
    if (findProductDto.min_price) {
      where = {
        ...where,
        price: {
          [Op.gt]: findProductDto.min_price
        }
      }
    }
    if (findProductDto.description) { where['description'] = { [Op.like]: `%${findProductDto.description}%`}}
    if (findProductDto.category_id) {
      where = {
        ...where,
        category_id: {
          [Op.lt]: findProductDto.category_id
        }
      }
    }

    return this.productRepository.findAll({where, include: {all: true}});
  }

  findOne(id: number) {
    return this.productRepository.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(
      {...updateProductDto},
      {where: {id}, returning: true}
    );
  }

  remove(id: number) {
    return this.productRepository.destroy({where: {id}});
  }
}
