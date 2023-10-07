import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {v4} from 'uuid';
import { Op } from 'sequelize';
import { LoginAdminDto } from './dto/login-admin.dto';
import { FindFilteredAdminsDto } from './dto/find-filtered-admins.dto';

const {env} = process;

@Injectable()
export class AdminService {
  constructor (
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}
 

  // Admin REGISTRATION account
  async registration (
    createAdminDto: CreateAdminDto,
    res: Response,
  ) {
    // Find the username
    const findAdmin = await this.adminRepository.findOne({where: {username: createAdminDto.username}})
    if (findAdmin) throw new BadRequestException('This Username Already Registered!')

    // Matching Passwords
    if (createAdminDto.password !== createAdminDto.confirm_password) 
      throw new BadRequestException('Passwords do not match');

    // Hashing the password
    const hashed_password = await bcrypt.hash(createAdminDto.password, 12);

    // Create the new admin
    const newAdmin = await this.adminRepository.create({
      ...createAdminDto,
      hashed_password
    })

    const tokens = await this.getAdminTokens(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const activation_key: string = v4();

    const updatedAdmin = await this.adminRepository.update(
      {hashed_refresh_token,
      activation_link: activation_key},
      {where: {id: newAdmin.id}, returning: true}
    )

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    try {
      await this.mailService.sendAdminConfirmation(updatedAdmin[1][0])
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Mail Confirmation Error')
    }

    const response = {
      message: 'Admin created successfully',
      admin: updatedAdmin[1][0],
      tokens,
    }
    return response;
  }

  // Admin ACTIVATION account
  async activate (link: string){
    if (!link) throw new BadRequestException("Activation link not found")

    const updatedAdmin = await this.adminRepository.update(
      {status: true},
      {where: {activation_link: link, status: false}, returning: true}
    )
    if (!updatedAdmin) throw new BadRequestException('Admin already activated')

    const response = {
      message: "Admin activated successfully",
      admin: updatedAdmin[1][0],
    }
    return response;
  }

  // Admin LOGIN account
  async login (
    loginAdminDto: LoginAdminDto,
    res: Response,
  ) {
    const {username, password} = loginAdminDto

    const findAdmin = await this.adminRepository.findOne({where: {username}});
    if (!findAdmin) throw new BadRequestException('Admin is not Found'); 
    const isMatchPass = await bcrypt.compare(password, findAdmin.hashed_password);
    if (!isMatchPass) throw new BadRequestException('Admin is not Found');
    if (!findAdmin.status) throw new BadRequestException('Admin is not activated');

    const tokens = await this.getAdminTokens(findAdmin)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);

    const updatedAdmin = await this.adminRepository.update(
      {hashed_refresh_token},
      {where: {id: findAdmin.id}, returning: true}
    )

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    const response = {
      message: "Logged In Successfully",
      admin: updatedAdmin[1][0],
      tokens,
    }
    return response
  }

  // Admin LOGOUT
  async logout(
    refreshToken: string,
    res: Response
  ) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: env.REFRESH_TOKEN_KEY,
    })
    if (!adminData) throw new UnauthorizedException("Admin not found")

    const updatedAdmin = await this.adminRepository.update(
      {hashed_refresh_token: null},
      {where: {id: adminData.id}, returning: true}
    )

    res.clearCookie('refresh_token');
    
    const response = {
      message: "Logged Out Successfully",
      admin: updatedAdmin[1][0],
    }
    return response;
  }

  // REFRESH TOKEN
  async refreshToken(
    admin_id: number,
    refreshToken: string,
    res: Response
  ) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (admin_id != decodedToken['id']) throw new BadRequestException('Admin not found');

    const findAdmin = await this.adminRepository.findByPk(admin_id);
    if (!findAdmin || !findAdmin.hashed_refresh_token) throw new BadRequestException('Admin not found');

    const tokenMatch = await bcrypt.compare(refreshToken, findAdmin.hashed_refresh_token);
    if (!tokenMatch) throw new ForbiddenException("Forbidden Token");

    const tokens = await this.getAdminTokens(findAdmin)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const updatedAdmin = await this.adminRepository.update(
      {hashed_refresh_token},
      {where: {id: admin_id}, returning: true}
    )

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    const resoponse = {
      message: "Token refreshed succesfully",
      admin: updatedAdmin[1][0],
      tokens,
    }
    return resoponse;
  }

  // FIND ADMINS
  async findFilteredAdmins (findFilteredAdminsDto: FindFilteredAdminsDto) {
    let where = {}

    if (findFilteredAdminsDto.email) where['email'] = { [Op.like]: `%${findFilteredAdminsDto.email}%`};
    if (findFilteredAdminsDto.username) where['username'] = { [Op.like]: `%${findFilteredAdminsDto.username}%`};

    // if (findFilteredAdminsDto.role) {
    //   where = {
    //     ...where,
    //     role: {
    //       [Op.like]: `%${findFilteredAdminsDto.role}%`,
    //     }
    //   }
    // }

    // if (findFilteredAdminsDto.role) where['role'] = { [Op.iLike]: `%${findFilteredAdminsDto.role}%`};
    // console.log(where);

    const filteredAdmins = await this.adminRepository.findAll({where, include: {all: true}})
    return filteredAdmins;
  }

  // FIND ADMIN BY ID
  async findOneById (id: number, req: Request) {
    const admin = req['admin'];
    if (admin.id == id || admin.role == 'SUPERADMIN') {
      const findAdmin = await this.adminRepository.findByPk(id)
      return findAdmin
    } else {
      throw new ForbiddenException('You do not have permission')
    }
  }

  // DELETE ADMIN BY ID
  async deleteAdminById (id: number) {
    await this.adminRepository.destroy({where: {id}});
    return {
      message: "Successfully deleted"
    }
  }

  // UPDATE ADMIN BY ID
  async updateAdminById (
    updateAdminDto: UpdateAdminDto,
    id: number
  ) {
    const updatedAdmin = await this.adminRepository.update(
      {...updateAdminDto},
      {where: {id}, returning: true}
    )
    return updatedAdmin[1][0]
  }


   // get tokens admin method
   async getAdminTokens (admin: Admin) {
    const jwtPayload = {
        id: admin.id,
        status: admin.status,
        role: admin.role,
    };
    const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
            secret: env.ACCESS_TOKEN_KEY,
            expiresIn: env.ACCESS_TOKEN_TIME,
        }),
        this.jwtService.signAsync(jwtPayload, {
            secret: env.REFRESH_TOKEN_KEY,
            expiresIn: env.REFRESH_TOKEN_TIME,
        }),
    ]);
    return {
        access_token,
        refresh_token,
    };
  }
}
