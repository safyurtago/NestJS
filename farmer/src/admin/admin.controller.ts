import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  create (@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('signin')
  login (
    @Body() loginAdminDto: LoginAdminDto,
    @Res({passthrough: true}) res: Response
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @Get('find')
  findAll () {
    return this.adminService.findAll();
  }

  @Get('find/:id')
  findOne (@Param('id') id: string) {
    return this.adminService.findOne(id); 
  }

  @Put('update/:id')
  update (
    @Body() updateAdminDto: UpdateAdminDto,
    @Param('id') id: string,
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete('delete/:id')
  remove (@Param('id') id: string) {
    return this.adminService.remove(id);
  }

}
