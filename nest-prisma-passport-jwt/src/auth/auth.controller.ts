import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body() authDto: AuthDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.authService.signup(authDto, res);
  }

  @Post('signin')
  signin (
    @Body() authDto: AuthDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.authService.signin(authDto, res);
  }

  @Post('signout')
  signout(
    @Body() data: number,
    @Res({passthrough: true}) res: Response
  ) {
    return this.authService.signout(data['userId'], res);
  }



  @Get('find')
  findAll () {
    return this.authService.findAll();
  }


}
