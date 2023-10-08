import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './models/product.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({summary: "Create a new product"})
  @ApiResponse({status: 201, type: Product})
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({summary: "get products"})
  @ApiResponse({status: 200, type: [Product]})
  @Get()
  findAll(@Body() findProductDto: FindProductDto) {
    return this.productService.findAll(findProductDto);
  }

  @ApiOperation({summary: "get product"})
  @ApiResponse({status: 200, type: Product})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiOperation({summary: "update product"})
  @ApiResponse({status: 200, type: Product})
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return  this.productService.update(+id, updateProductDto);
  }

  @ApiOperation({summary: "delete product"})
  @ApiResponse({status: 200, type: Product})
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
