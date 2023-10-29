import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { RefreshTokenGuard } from '../common/guards';
import { Tokens } from './types';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signup(
    @Body() authDto: AuthDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.authService.signup(authDto, res);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin (
    @Body() authDto: AuthDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.authService.signin(authDto, res);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signout(
    @GetCurrentUserId() userId: number,
    @Res({passthrough: true}) res: Response
  ) {
    return this.authService.signout(userId, res);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true}) res: Response
  ): Promise<Tokens> {
       return this.authService.refreshTokens(userId, refreshToken, res);
     }



  @Get('find')
  findAll () {
    return this.authService.findAll();
  }


}
