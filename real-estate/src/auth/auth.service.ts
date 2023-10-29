import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';

import { JWtPayload, Tokens } from './types';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  async signup(authSignUpDto: RegisterAuthDto, res: Response): Promise<Tokens> {
    const constcandidate = await this.prismaService.admins.findUnique(
      {
        where: { username: authSignUpDto.username }
      }
    );
    if (constcandidate) throw new BadRequestException('Username already exists!');

    const hashedPassword = await bcrypt.hash(authSignUpDto.password, 7);
    const newUser = await this.prismaService.admins.create({
      data: {
        first_name: authSignUpDto.first_name,
        last_name: authSignUpDto.last_name,
        phone_number: authSignUpDto.phone_number,
        username: authSignUpDto.username,
        hashedPassword
      }
    });

    const tokens = await this.getTokens(newUser.id, newUser.username);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);
    
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });

    return tokens;
  }

  async signin(authSignInDto: LoginAuthDto, res: Response): Promise<Tokens> {
    const { username, password } = authSignInDto;

    const admin = await this.prismaService.admins.findUnique({
      where: { username }
    });
    if (!admin) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(password, admin.hashedPassword);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(admin.id, admin.username);
    await this.updateRefreshToken(admin.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });

    return tokens;
  }

  async signout(adminId: number, res: Response): Promise<boolean> {
    const admin = await this.prismaService.admins.updateMany({
      where: {
        id: adminId,
        hashedRefreshToken: {
          not: null
        }
      },
      data: {
        hashedRefreshToken: null
      }
    });
    if (!admin) throw new ForbiddenException('Access Denied')

    res.clearCookie('refresh_token');
    return true;
  }

  async refreshTokens(adminId: number, refreshToken: string, res: Response): Promise<Tokens>{
    const admin = await this.prismaService.admins.findUnique(
      {
        where: {id: adminId}
      }
    );
    if (!admin || !admin.hashedRefreshToken) throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(refreshToken, admin.hashedRefreshToken);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(admin.id, admin.username);
    await this.updateRefreshToken(admin.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    return tokens;
  }


  async getTokens(adminId: number, username: string): Promise<Tokens> {
    const JwtPayload: JWtPayload = {
      sub: adminId,
      username: username
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(JwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(JwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      })
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }  
  }
  
  async updateRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prismaService.admins.update(
      {
        where: {
           id: userId 
        },
        data: {
          hashedRefreshToken: hashedRefreshToken
        }
      }
    );
  }
}
