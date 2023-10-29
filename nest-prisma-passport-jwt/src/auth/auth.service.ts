import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload, Tokens } from './types';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';


@Injectable()
export class AuthService {
  constructor (
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup (
    authDto: AuthDto, res: Response
  ): Promise<Tokens> {
    
    const canditate = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email
      }
    });
    if (canditate) { throw new BadRequestException('Email already registered') }

    const hashed_password = await bcrypt.hash(authDto.password, 12)
    const newUser = await this.prismaService.user.create({
      data: {
        email: authDto.email,
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

  async signin (authDto: AuthDto, res: Response) {
    const {email, password} = authDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email
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

  async signout (userId: number, res: Response) {
    const user = await this.prismaService.user.updateMany({
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

  async refreshTokens(userId: number, refreshToken: string, res: Response): Promise<Tokens>{
    const user = await this.prismaService.user.findUnique(
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
    return this.prismaService.user.findMany();
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
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

  async updateRefrefhToken(userId: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12)
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashed_refresh_token: hashedRefreshToken,
      }
    })
  }

}
