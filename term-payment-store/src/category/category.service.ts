import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { FindCategoryDto } from './dto/find-category.dto';
import { Op } from 'sequelize';

@Injectable()
export class CategoryService {
  constructor (@InjectModel(Category) private categoryRepository: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const findCategory = await this.categoryRepository.findOne({where: {name: createCategoryDto.name}})
    if (findCategory) { throw new BadRequestException("Category already exists")}
    return this.categoryRepository.create(createCategoryDto);
  }

  async findAll(findCategory: FindCategoryDto) {
    const where = {}
    
    // if (findCategory.name) { where['name'] = {[Op.like]: `%${findCategory.name}%`} }
    

    const findAllCategories = await this.categoryRepository.findAll({where, include: {all: true}})
    return findAllCategories;
  }

  findOne(id: number) {
    return this.categoryRepository.findByPk(id, {include: {all: true}});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryRepository.update(
      {...updateCategoryDto},
      {where: {id}, returning: true}
    )
    return updatedCategory[1][0];
  }

  remove(id: number) {
    return this.categoryRepository.destroy({where: {id}});
  }
}
