import { Response } from 'express';
import { Controller, Post, Body, HttpCode, HttpStatus, Res } from '@nestjs/common';

import { Tokens } from './types';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { GetCurrenAdminId, GetCurrentAdmin } from '../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() registerAuthDto: RegisterAuthDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<Tokens> {
    return this.authService.signup(registerAuthDto, res);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() loginAuthDto: LoginAuthDto, 
    @Res({ passthrough: true }) res: Response
  ): Promise<Tokens> {
    return this.authService.signin(loginAuthDto, res);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signout(
    @GetCurrenAdminId() adminID: number,
    @Res({ passthrough: true }) res: Response
  ): Promise<boolean> {
    console.log(1);
    
    return this.authService.signout(adminID, res);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrenAdminId() adminID: number,
    @GetCurrentAdmin('refreshToken') refreshToken: string,
    @Res({ passthrough: true}) res: Response
  ): Promise<Tokens> {
       return this.authService.refreshTokens(adminID, refreshToken, res);
     }
}
