import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import {hash, compare} from 'bcrypt'
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';

const {env} = process;

@Injectable()
export class AdminService {
  constructor (
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService
    ) {}

  async create (createAdminDto: CreateAdminDto) {
    const findAdmin = await this.adminModel.findOne({email: createAdminDto.email});
    if (findAdmin) throw new BadRequestException("Admin already exists")

    const {password, confirm_password} = createAdminDto;
    if (password != confirm_password) {
      throw new BadRequestException('Passwords do not match!')
    }
    const hashed_password = await hash(password, 12);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password
    })

    const tokens = await this.getAdminTokens(newAdmin);
    const hashed_token = await hash(tokens.refresh_token, 12);
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      newAdmin.id,
      {hashed_token}, 
      {new: true}
    )
    return updatedAdmin;
  }


  async login (
    loginAdminDto: LoginAdminDto,
    res: Response
    ) {
    const {email, password} = loginAdminDto;

    const findAdmin = await this.adminModel.findOne({email});
    if (!findAdmin) { throw new BadRequestException('Admin not found')}

    const isMatch = await compare(password, findAdmin.hashed_password);
    if (!isMatch) throw new BadRequestException('Admin not found');

    const tokens = await this.getAdminTokens(findAdmin);
    const hashed_token = await hash(tokens.refresh_token, 12);
    
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      findAdmin.id,
      {
      ...findAdmin,
      hashed_token,
    },
    {new: true}
    )
    res.cookie('refresh_token', hashed_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true,
    })

    return updatedAdmin

  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find();
  }

  async findOne(id: string): Promise<Admin> {
    return this.adminModel.findById(id)
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate(
      id,
      {...updateAdminDto,},
      {new: true},
    )
  }

  async remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }

  async getAdminTokens (admin: AdminDocument) {
    
    const jwtPayload = {
        id: admin.id,
        is_active: admin.is_active,
        is_creator: admin.is_creator,
    };
    const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
            secret: env.ACCESS_TOKEN_KEY || 'myAccessSecretKey',
            expiresIn: env.ACCESS_TOKEN_TIME || '15h',
        }),
        this.jwtService.signAsync(jwtPayload, {
            secret: env.REFRESH_TOKEN_KEY || 'myRefreshSecretKey',
            expiresIn: env.REFRESH_TOKEN_TIME || '15d',
        }),
    ]);
    return {
        access_token,
        refresh_token,
    };
};
}
