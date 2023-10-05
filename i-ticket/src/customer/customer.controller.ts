import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookie-getter.decorator';
import { CustomerGuard } from 'src/guards/customer.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomerDto } from './dto/find-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './models/customer.model';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Registeration API
  @ApiOperation({summary: 'Create customer'})
  @ApiResponse({status: 201, type: Customer})
  @Post('signup')
  registration (
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({passthrough: true}) res: Response
  ) {
    return this.customerService.registration(createCustomerDto, res);
  }

  // Login API
  @ApiOperation({summary: 'Login customer'})
  @ApiResponse({status: 200, type: Customer})
  @Post('signin')
  login (
    @Body() loginCustomerDto: LoginCustomerDto,
    @Res({passthrough: true}) res: Response
  ) {
    return this.customerService.login(loginCustomerDto, res);
  }

  // Logout API

  @ApiOperation({summary: 'Logout customer'})
  @ApiResponse({status: 200, type: Customer})
  @UseGuards(CustomerGuard)
  @Post('signout')
  logout (
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({passthrough: true}) res: Response
  ) {
    return this.customerService.logout(refresh_token, res)
  }

  // Activation Link API
  @ApiOperation({summary: 'Activate customer'})
  @ApiResponse({status: 200, type: Customer})
  @Get('activate/:link')
  activate (
    @Param('link') link: string
  ) {
    return this.customerService.activate(link)
  }

  // Refresh Token API
  @ApiOperation({summary: 'Refresh Token'})
  @ApiResponse({status: 200, type: Customer})
  @UseGuards(CustomerGuard)
  @Post(':id/refresh')
  refreshToken (
    @Param('id') id: number,
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({passthrough: true}) res: Response
  ) {
    return this.customerService.refreshToken(id, refresh_token, res)
  }

  @Post('find')
  findAll(@Body() findCustomerDto: FindCustomerDto) {
    return this.customerService.findAll(findCustomerDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
