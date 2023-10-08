import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CustomerGuard } from '../guards/customer.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.model';

@ApiTags('payment')
@Controller('payment')
@UseGuards(CustomerGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({summary: "create payment"})
  @ApiResponse({status: 201, type: Payment })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto, @Req() req: Request) {
    return this.paymentService.create(createPaymentDto, req);
  }

  @ApiOperation({summary: "find payment"})
  @ApiResponse({status: 200, type: Payment})
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({summary: "find payment"})
  @ApiResponse({status: 200, type: Payment})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiOperation({summary: "update payment"})
  @ApiResponse({status: 200, type: Payment})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto, @Req() req: Request) {
    return this.paymentService.update(+id, updatePaymentDto, req);
  }

  @ApiOperation({summary: "delete payment"})
  @ApiResponse({status: 200, type: Payment})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
