import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Res, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { LoginAdminDto } from './dto/login-admin.dto';
import { RefreshTokenGuard } from '../common/guards';
import { Tokens } from './types';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signup(
    @Body() authDto: CreateAdminDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.adminService.signup(authDto, res);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin (
    @Body() authDto: LoginAdminDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.adminService.signin(authDto, res);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signout(
    @GetCurrentUserId() userId: string,
    @Res({passthrough: true}) res: Response
  ) {
    return this.adminService.signout(userId, res);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true}) res: Response
  ): Promise<Tokens> {
       return this.adminService.refreshTokens(userId, refreshToken, res);
     }

}
