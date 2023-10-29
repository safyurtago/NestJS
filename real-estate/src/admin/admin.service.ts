import { LoginAdminDto } from './dto/login-admin.dto';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AdminService {
  constructor (
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup (
    createAdminDto: CreateAdminDto, res: Response
  ) {
    
    const canditate = await this.prismaService.admin.findUnique({
      where: {
        email: createAdminDto.email
      }
    });
    if (canditate) { throw new BadRequestException('Email already registered') }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 12)
    const newUser = await this.prismaService.admin.create({
      data: {
        email: createAdminDto.email,
        first_name: createAdminDto.first_name,
        last_name: createAdminDto.last_name,
        username: createAdminDto.username,
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

  async signin (loginAdminDto: LoginAdminDto, res: Response) {
    const {email, password} = loginAdminDto;
    const user = await this.prismaService.admin.findUnique({
      where: {
        email: loginAdminDto.email
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
    const user = await this.prismaService.admin.updateMany({
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
    const user = await this.prismaService.admin.findUnique(
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
    return this.prismaService.admin.findMany();
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
    await this.prismaService.admin.update({
      where: {
        id: userId,
      },
      data: {
        hashed_refresh_token: hashedRefreshToken,
      }
    })
  }
}
