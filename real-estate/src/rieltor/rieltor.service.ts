import { JwtService } from '@nestjs/jwt';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { CreateRieltorDto } from './dto/create-rieltor.dto';
import { LoginRieltorDto } from './dto/login-rieltor.dto';

@Injectable()
export class RieltorService {
  constructor (
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signup (
    createRieltorDto: CreateRieltorDto, res: Response
  ) {
    
    const canditate = await this.prismaService.rieltor.findUnique({
      where: {
        email: createRieltorDto.email
      }
    });
    if (canditate) { throw new BadRequestException('Email already registered') }

    const hashed_password = await bcrypt.hash(createRieltorDto.password, 12)
    const newUser = await this.prismaService.rieltor.create({
      data: {
        email: createRieltorDto.email,
        first_name: createRieltorDto.first_name,
        last_name: createRieltorDto.last_name,
        username: createRieltorDto.username,
        hashed_password,
      },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email)
    await this.updateRefrefhToken(newUser.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*60*60*24*1000,
      httpOnly: true
    });
    return tokens;
  } 

  async signin (loginRieltorDto: LoginRieltorDto, res: Response) {
    const {email, password} = loginRieltorDto;
    const user = await this.prismaService.rieltor.findUnique({
      where: {
        email: loginRieltorDto.email
      }
    });
    if (!user) { throw new ForbiddenException('Acces Deinied') }

    const isPassMatch = await bcrypt.compare(password, user.hashed_password)
    if (!isPassMatch) { throw new ForbiddenException('Acces Deinied') }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefrefhToken(user.id, tokens.refresh_token)
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*60*60*24*1000,
      httpOnly: true
    })
    return tokens;
  }

  async signout (userId: string, res: Response) {
    const user = await this.prismaService.rieltor.updateMany({
      where: {
        id: userId,
        hashed_refresh_token: {
          not: null,
        }
      },
      data: {
        hashed_refresh_token: null
      }
    })
    if (!user) { throw new ForbiddenException('Acces Deinied') }

    res.clearCookie('refresh_token')
    return true
  }

  async refreshTokens(userId: string, refreshToken: string, res: Response) {
    const user = await this.prismaService.rieltor.findUnique(
      {
        where: {id: userId}
      }
    );
    if (!user || !user.hashed_refresh_token) throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(refreshToken, user.hashed_refresh_token);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefrefhToken(user.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    return tokens;
  }


  async findAll() {
    return this.prismaService.rieltor.findMany();
  }

  async getTokens(userId: string, email: string) {
    const jwtPayload = {
      sub: userId,
      email: email,
    }
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: 'MyAccessTokenKey',
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: 'MyRefreshTokenKey',
        expiresIn: '7d',
      })
    ]);
    return {
      access_token,
      refresh_token
    }
  }

  async updateRefrefhToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12)
    await this.prismaService.rieltor.update({
      where: {
        id: userId,
      },
      data: {
        hashed_refresh_token: hashedRefreshToken,
      }
    })
  }
}
