import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor (
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepo.save(createProductDto);
  }

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    return this.productRepo.findOne({where: {id}});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepo.update({id}, {...updateProductDto});
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.productRepo.delete({id})
    return id;
  }
}
