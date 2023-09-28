import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MailService } from 'src/mail/mail.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import * as bcrypt from 'bcrypt';
import {v4} from 'uuid'
import { Response } from 'express';
import { link } from 'fs';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService
    ) {}

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    
    const admin = await this.adminRepository.findOne({
      where: {username: createAdminDto.username}
    });
    
    if (admin) {
      throw new BadRequestException('Username already registered!');
    }
    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Passwords do not match!');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 12)
    const newAdmin = await this.adminRepository.create({
      ...createAdminDto,
      hashed_password
    });

    const tokens = await this.getTokens(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const uniqueKey: string = v4()

    const updatedAdmin = await this.adminRepository.update({
      hashed_refresh_token,
      activation_link: uniqueKey
    },
    {
      where: {id: newAdmin.id}, returning: true
    })
    
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    try {
      await this.mailService.sendUserConfirmation(updatedAdmin[1][0])
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: 'Admin registered',
      admin: updatedAdmin[1][0],
      tokens
    }
    return response;
  }
  
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not gound')
    }
    const updatedAdmin = await this.adminRepository.update(
      {is_active: true}, 
      {where: {activation_link: link, is_active: false}, returning: true}
    )
    if (!updatedAdmin) {
      throw new BadRequestException('Admin already activated')
    }
    const response = {
      message: 'Admin activated Successfully',
      admin: updatedAdmin
    }
    return response
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      })
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  };

}
