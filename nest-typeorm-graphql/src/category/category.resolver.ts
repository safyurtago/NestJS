import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from './entities/category.entity';

@Resolver('category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(@Args('createCategory') createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Query(() => [Category])
  findAllCategory() {
    return this.categoryService.findAll();
  }

  @Query(() => Category)
  findOneCategory(@Args('id', {type: () => ID}) id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(@Args('id', {type: () => ID}) id: number, @Args('updateCategory') updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Mutation(() => Number)
  removeCategory(@Args('id', {type: () => ID}) id: number) {
    return this.categoryService.remove(id);
  }
}
