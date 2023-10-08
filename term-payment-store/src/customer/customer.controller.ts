import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Put, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Customer } from './models/customer.model';
import { Response } from 'express';
import { LoginCustomerDto } from './dto/customer-login.dto';
import { CookieGetter } from '../decorators/cookie-getter.decorator';
import { FindFilteredCustomersDto } from './dto/find-filtered-customers.dto';
import { CustomerGuard } from '../guards/customer.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}


  @ApiOperation({summary: "Create customer"})
  @ApiResponse({status: 200, type: Customer})
  @Post('signup')
  registration (
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.customerService.registration(createCustomerDto, res);
  }

  @Get('activate/:link')
  activate (
    @Param('link') link: string,
  ) {
    return this.customerService.activate(link)
  }

  // LOGIN CUSTOMER
  @ApiOperation({summary: 'Login admin'})
  @ApiResponse({status: 200, type: Customer})
  @Post('signin')
  login (
    @Body() loginCustomerDto: LoginCustomerDto,
    @Res({passthrough: true}) res: Response,
    ) {
    return this.customerService.login(loginCustomerDto, res);
  }

  // LOGOUT CUSTOMER
  @ApiOperation({summary: 'Logout admin'})
  @ApiResponse({status: 200, type: Customer})
  @UseGuards(CustomerGuard)
  @Post('signout')
  logout (
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.customerService.logout(refreshToken, res);
  }

  // REFRESH TOKEN
  @Post(':id/refresh-token')
  @UseGuards(CustomerGuard)
  async refreshToken(
    @Param('id') customer_id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.customerService.refreshToken(customer_id, refreshToken, res);
  }


  // FIND FILTERED CUSTOMERS
  @ApiOperation({summary: 'Find filtered customers'})
  @ApiResponse({status: 200, type: [Customer]})
  // @UseGuards(AdminGuard)
  @Post('findall')
  findFilteredAdmins (
    @Body() findFilteredCustomersDto: FindFilteredCustomersDto,
  ) {
    return this.customerService.findFilteredCustomers(findFilteredCustomersDto);
  }

  // FIND CUSTOMER BY ID
  @ApiOperation({summary: 'Find customer by ID'})
  @ApiResponse({status: 200, type: Customer})
  @Get('find/:id')
  findAdminById (
    @Param('id') id: number,
    @Req() req: Request,
  ) {
    return this.customerService.findOneById(id, req);
  }

  // DELETE CUSTOMER BY ID
  @ApiOperation({summary: 'Delete customer by ID'})
  @ApiResponse({status: 200, type: Customer})
  // @UseGuards(AdminGuard)
  @Delete('delete/:id')
  deleteAdminById (
    @Param('id') id: number
  ) {
    return this.customerService.deleteCustomerById(id);
  }

  // UPDATE CUSTOMER BY ID
  @ApiOperation({summary: 'Update customer by ID'})
  @ApiResponse({status: 200, type: Customer})
  // @UseGuards(AdminGuard)
  @Put('update/:id')
  updateAdminById (
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto, 
  ) {
    return this.customerService.updateCustomerById(updateCustomerDto, id)
  }



}
