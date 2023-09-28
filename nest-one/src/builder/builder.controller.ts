import { Builder } from './models/builder.module';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';

@Controller('builder')
export class BuilderController {
    constructor(private readonly builderService: BuilderService) {}

    @Post('create')
    async createBuilder(@Body() createBuilderDto: CreateBuilderDto): Promise<Builder> {
        return this.builderService.createBuilder(createBuilderDto)
    }

    @Get('getAll')
    async getAllBuilder(): Promise<Builder[]> {
        return this.builderService.getAll();
    }

    @Get('getOne/:id')
    async getOneBuilder(@Param('id') id: number): Promise<Builder> {
        return this.builderService.getOne(id);
    }

    @Delete('delete/:id')
    async deleteBuilder(@Param('id') id: number): Promise<number> {
        return this.builderService.deleteOne(id);
    }

    @Put('update/:id')
    async updateBuilder(@Param('id') id: number, @Body() updateBuilderDto: UpdateBuilderDto): Promise<[number, UpdateBuilderDto[]]> {
        return this.builderService.updateOne(id, updateBuilderDto);
    }
}
