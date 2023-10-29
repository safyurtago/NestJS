import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { RieltorService } from './rieltor.service';
import { CreateRieltorDto } from './dto/create-rieltor.dto';
import { UpdateRieltorDto } from './dto/update-rieltor.dto';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { Response } from 'express';
import { LoginRieltorDto } from './dto/login-rieltor.dto';
import { RefreshTokenGuard } from '../common/guards';
import { Tokens } from '../admin/types';

@Controller('rieltor')
export class RieltorController {
  constructor(private readonly rieltorService: RieltorService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signup(
    @Body() authDto: CreateRieltorDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.rieltorService.signup(authDto, res);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin (
    @Body() authDto: LoginRieltorDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.rieltorService.signin(authDto, res);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signout(
    @GetCurrentUserId() userId: string,
    @Res({passthrough: true}) res: Response
  ) {
    return this.rieltorService.signout(userId, res);
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
       return this.rieltorService.refreshTokens(userId, refreshToken, res);
     }
}
