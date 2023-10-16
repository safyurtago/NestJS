import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalInfoService } from './animal_info.service';
import { CreateAnimalInfoDto } from './dto/create-animal_info.dto';
import { UpdateAnimalInfoDto } from './dto/update-animal_info.dto';

@Controller('animal-info')
export class AnimalInfoController {
  constructor(private readonly animalInfoService: AnimalInfoService) {}

  @Post()
  create(@Body() createAnimalInfoDto: CreateAnimalInfoDto) {
    return this.animalInfoService.create(createAnimalInfoDto);
  }

  @Get()
  findAll() {
    return this.animalInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalInfoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalInfoDto: UpdateAnimalInfoDto) {
    return this.animalInfoService.update(id, updateAnimalInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalInfoService.remove(id);
  }
}
