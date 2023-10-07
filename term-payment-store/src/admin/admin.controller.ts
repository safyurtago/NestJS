import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Admin } from './models/admin.model';
import { AdminGuard } from '../guards/admin.guard';
import { SuperAdminGuard } from '../guards/super-admin.guard';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from '../decorators/cookie-getter.decorator';
import { FindFilteredAdminsDto } from './dto/find-filtered-admins.dto';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  // REGISTER ADMIN
  @ApiOperation({summary: 'register admin'})
  @ApiResponse({status: 201, type: Admin})
  @UseGuards(SuperAdminGuard)
  @UseGuards(AdminGuard)
  @Post('signup')
  registration (
    @Body() createAdminDto: CreateAdminDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  // LOGIN ADMIN
  @ApiOperation({summary: 'Login admin'})
  @ApiResponse({status: 200, type: Admin})
  @Post('signin')
  login (
    @Body() loginAdminDto: LoginAdminDto,
    @Res({passthrough: true}) res: Response,
    ) {
    return this.adminService.login(loginAdminDto, res);
  }

  // ACTIVATE ADMIN BY EMAIL
  @Get('activate/:link')
  activate (@Param('link') link: string) {
    return this.adminService.activate(link);
  }

  // LOGOUT ADMIN
  @ApiOperation({summary: 'Logout admin'})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(AdminGuard)
  @Post('signout')
  logout (
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  // REFRESH TOKEN
  @UseGuards(AdminGuard)
  @Post(':id/refresh-token')
  async refreshToken(
    @Param('id') admin_id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.adminService.refreshToken(admin_id, refreshToken, res);
  }

  // FIND FILTERED ADMINS
  @ApiOperation({summary: 'Find filtered admins'})
  @ApiResponse({status: 200, type: [Admin]})
  @UseGuards(SuperAdminGuard)
  @UseGuards(AdminGuard)
  @Post('findall')
  findFilteredAdmins (
    @Body() findFilteredAdminsDto: FindFilteredAdminsDto,
  ) {
    return this.adminService.findFilteredAdmins(findFilteredAdminsDto);
  }

  // FIND ADMIN BY ID
  @ApiOperation({summary: 'Find admin by ID'})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(AdminGuard)
  @Get('find/:id')
  findAdminById (
    @Param('id') id: number,
    @Req() req: Request,
  ) {
    return this.adminService.findOneById(id, req);
  }

  // DELETE ADMIN BY ID
  @ApiOperation({summary: 'Delete admin by ID'})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(SuperAdminGuard)
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  deleteAdminById (
    @Param('id') id: number
  ) {
    return this.adminService.deleteAdminById(id);
  }

  // UPDATE ADMIN BY ID
  @ApiOperation({summary: 'Update admin by ID'})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(SuperAdminGuard)
  @UseGuards(AdminGuard)
  @Put('update/:id')
  updateAdminById (
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdminById(updateAdminDto, id)
  }




}
