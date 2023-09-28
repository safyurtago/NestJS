import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '..//users/users.service';

import * as bcrypt from 'bcrypt';
import { User } from 'src/users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService){}

  async register(createUserDto: CreateUserDto) {
    const condidate = await this.userService.findOne(createUserDto.email);
    
    if (condidate) throw new HttpException('Bunday foydalanuvchi mavjud', HttpStatus.BAD_REQUEST)
    
    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    const user = await this.userService.create({ ...createUserDto, password: hashedPassword});

    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.ValidatrUser(loginDto);

    if(!user) throw new UnauthorizedException("User topilmadi")

    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles};
    return {token: this.jwtService.sign(payload)}
  }

  private async ValidatrUser(loginDto: LoginDto){
    const user = await this.userService.findOne(loginDto.email);

    if (!user) throw new UnauthorizedException("Email yoki Password Notogri")
    
    const password = await bcrypt.compare(loginDto.password, user.password);

    if (!password) throw new UnauthorizedException("Email yoki Password Notogri")

    return user;
  }

}
