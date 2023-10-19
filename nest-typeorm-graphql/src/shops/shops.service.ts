import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopsService {
  constructor (
    @InjectRepository(Shop) private readonly shopRepo: Repository<Shop>,
  ) {}

  create(createShopDto: CreateShopDto) {
    return this.shopRepo.save(createShopDto);
  }

  findAll() {
    return this.shopRepo.find();
  }

  findOne(id: number) {
    return this.shopRepo.findOne({where: {id}});
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    await this.shopRepo.update(id, {...updateShopDto});
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.shopRepo.delete(id);
    return id
  }
}
