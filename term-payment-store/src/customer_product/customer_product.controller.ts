import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CustomerProductService } from './customer_product.service';
import { CreateCustomerProductDto } from './dto/create-customer_product.dto';
import { UpdateCustomerProductDto } from './dto/update-customer_product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerProduct } from './models/customer_product.model';
import { CustomerGuard } from '../guards/customer.guard';
import { FindCustomerProductDto } from './dto/find-customer_product.dto';
import { CustomerSelfGuard } from '../guards/customer-self.guard';


@ApiTags('customer_product')
@Controller('customer-product')
@UseGuards(CustomerGuard)
export class CustomerProductController {
  constructor(private readonly customerProductService: CustomerProductService) {}

  @ApiOperation({summary: 'Create customer product'})
  @ApiResponse({status: 201, type: CustomerProduct})
  @Post()
  create(
    @Body() createCustomerProductDto: CreateCustomerProductDto,
    @Req() req: Request
  ) {
    return this.customerProductService.create(createCustomerProductDto, req);
  }

  @ApiOperation({summary: 'get customer product'})
  @ApiResponse({status: 200, type: [CustomerProduct]})
  @Post('find')
  findAll(
    @Req() req: Request,
    @Body() findCustomerProductDto: FindCustomerProductDto,
  ) {
    return this.customerProductService.findAll(findCustomerProductDto, req);
  }

  @ApiOperation({summary: 'get customer product'})
  @ApiResponse({status: 200, type: CustomerProduct})
  // @UseGuards(CustomerSelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerProductService.findOne(+id);
  }

  @ApiOperation({summary: 'update customer product'})
  @ApiResponse({status: 200, type: CustomerProduct})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerProductDto: UpdateCustomerProductDto) {
    return this.customerProductService.update(+id, updateCustomerProductDto);
  }

  @ApiOperation({summary: 'delete customer product'})
  @ApiResponse({status: 200, type: CustomerProduct})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerProductService.remove(+id);
  }
}
