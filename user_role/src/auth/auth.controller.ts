import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'register' })
  @ApiResponse({status: 201, description: 'token: sdsdfgehngmngbfd'})
  @Post('register')
  register(@Body() createUserDto: CreateUserDto){
    return this.authService.register(createUserDto) 
  }

  @ApiOperation({ summary: 'login' })
  @ApiResponse({status: 201, description: 'token: d,mcvsndbfhfdkds'})
  @Post('login')
  login(@Body() loginDro: LoginDto){
    return this.authService.login(loginDro)
  }  

}
