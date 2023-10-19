import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
  ) {}


  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: number) {
    return this.categoryRepo.findOne({where: {id}});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepo.update(id, {...updateCategoryDto});
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.categoryRepo.delete(id);
    return id
  }
}
