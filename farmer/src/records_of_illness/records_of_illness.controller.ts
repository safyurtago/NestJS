import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordsOfIllnessService } from './records_of_illness.service';
import { CreateRecordsOfIllnessDto } from './dto/create-records_of_illness.dto';
import { UpdateRecordsOfIllnessDto } from './dto/update-records_of_illness.dto';

@Controller('records-of-illness')
export class RecordsOfIllnessController {
  constructor(private readonly recordsOfIllnessService: RecordsOfIllnessService) {}

  @Post()
  create(@Body() createRecordsOfIllnessDto: CreateRecordsOfIllnessDto) {
    return this.recordsOfIllnessService.create(createRecordsOfIllnessDto);
  }

  @Get()
  findAll() {
    return this.recordsOfIllnessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsOfIllnessService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordsOfIllnessDto: UpdateRecordsOfIllnessDto) {
    return this.recordsOfIllnessService.update(id, updateRecordsOfIllnessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsOfIllnessService.remove(id);
  }
}
