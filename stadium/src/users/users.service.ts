import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import {v4} from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { LoginUserDto } from './dto/login-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { Op } from 'sequelize';


@Injectable()
export class UsersService {
    // Constructor
    constructor (
        @InjectModel(User) private readonly userRopository: typeof User,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailService
    ) {}

    // registration user
    async registration(createUserDto: CreateUserDto, res: Response) {
        const user = await this.userRopository.findOne({
            where: {username: createUserDto.username},
        });
        if (user) {
            throw new BadRequestException('Username already exists!');
        }
        if (createUserDto.password !== createUserDto.confirm_password) {
            throw new BadRequestException('Passwords do not match');
        }
        const hashed_password = await bcrypt.hash(createUserDto.password, 12)
        const newUser = await this.userRopository.create({
            ...createUserDto,
            hashed_password,
        }); 
        const tokens = await this.getTokens(newUser);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
        const uniqueKey: string = v4();

        const updatedUser = await this.userRopository.update({
            hashed_refresh_token,
            activation_link: uniqueKey
        }, {
            where: {id: newUser.id}, returning: true
        });
        res.cookie('refresh_token', tokens.refresh_token, {
            maxAge: 15*24*60*60*1000,
            httpOnly: true,
        });

        try {
            await this.mailerService.sendUserConfirmation(updatedUser[1][0])
        } catch (error) {
            console.log(error);
        }
        
        const response = {
            message: 'User Registered',
            user: updatedUser[1][0],
            tokens
        }
        return response
    }

    // activate user
    async activate(link: string) {
        if (!link) {
            throw new BadRequestException('Activation link not found')
        }
        
        const updatedUser = await this.userRopository.update(
            {is_active: true},
            {where: {activation_link: link, is_active: false}, returning: true},
        );

        if (!updatedUser) {
            throw new BadRequestException('User already activated')
        }
        const response = {
            message: "User activated successfully",
            user: updatedUser[1][0]
        }

        return response
    }

    // Login user
    async login(loginUserDto: LoginUserDto, res: Response) {
        
        const {email, password} = loginUserDto;
    
        const user = await this.userRopository.findOne({where: {email}});
        if(!user) throw new UnauthorizedException('User Not registred');
    
        if(!user.is_active) throw new BadRequestException('User is not active');
    
        const isMAtchPass = await bcrypt.compare(password, user.hashed_password);
        if(!isMAtchPass) throw new UnauthorizedException('User not registred');
    
        const tokens = await this.getTokens(user);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    
        const updateUser = await this.userRopository.update({hashed_refresh_token}, {where: {id: user.id}, returning: true});
    
        res.cookie('refresh_token', tokens.refresh_token, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});
    
        const response = {message: 'User logged in', user: updateUser[1][0], tokens}
        
        return response;
      }

      // Logout user 
    async logout (refreshToken: string, res: Response) {
        const userData = await this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY
        })
        if (!userData) {
            throw new ForbiddenException('User not found')
        }
        const updatedUser = await this.userRopository.update(
            {hashed_refresh_token: null},
            {where: {id: userData.id}, returning: true},
        );
        
        res.clearCookie('refresh_token')
        const response = {
            message: "User logged out successfully",
            user: updatedUser[1][0]
        }
        return response;
    }

    // Refresh user
    async refreshToken (user_id: number, refreshToken: string, res: Response) {
        const decodedToken = this.jwtService.decode(refreshToken);
        if (user_id != decodedToken['id']) {
            throw new BadRequestException('user not found')
        }
        const user = await this.userRopository.findOne({where: {id: user_id}});
        if (!user || !user.hashed_refresh_token) {
            throw new BadRequestException('user not found')
        }
        const tokenMatch = await bcrypt.compare(
            refreshToken,
            user.hashed_refresh_token,
        );
        if (!tokenMatch) {
            throw new ForbiddenException('Forbidden');
        }

        const tokens = await this.getTokens(user);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
        const updatedUser = await this.userRopository.update(
            {hashed_refresh_token},
            {where: {id: user_id}, returning: true}
        );
        res.cookie('refresh_token', tokens.refresh_token, {
            maxAge: 15*24 * 60 * 60 * 1000,
            httpOnly: true
        });

        const response = {
            message: "Token refreshed",
            user: updatedUser[1][0],
            tokens,
        }
        return response;
        
    }

    // Find user
    async findAll(findUserDto: FindUserDto) {
        const where = {};
    
        if(findUserDto.first_name) where['first_name'] = { [Op.like]: `%${findUserDto.first_name}%`};
      
        if(findUserDto.last_name) where['last_name'] = { [Op.like]: `%${findUserDto.last_name}%`};
    
        if(findUserDto.username) where['username'] = { [Op.like]: `%${findUserDto.username}%`};
    
        if(findUserDto.email) where['email'] = { [Op.like]: `%${findUserDto.email}% `}
    
        if(findUserDto.phone) where['phone'] = { [Op.like]: `${findUserDto.phone}%`}
    
        if(findUserDto.birthday_begin && findUserDto.birthday_end) where[Op.and] = { birthday: { [Op.between]: [findUserDto.birthday_begin, findUserDto.birthday_end] }};
        else if(findUserDto.birthday_begin) where['birthday'] = { [Op.gte]: findUserDto.birthday_begin };
        else if(findUserDto.birthday_end) where['birthday'] = { [Op.lte]: findUserDto.birthday_end };
    
        const user = await User.findAll({ where });
        if(!user) throw new BadRequestException('User Not Found');
    
        return user;
      }

    async findUser (id: number) {
        return this.userRopository.findByPk(id, {include: {all: true}})
    }

    async deleteUser (id: number) {
        return this.userRopository.destroy({where: {id}})
    }

    async updateUser () {}

    // Get Token Method
    async getTokens(user: User) {
        const jwtPayload = {
            id: user.id,
            is_active: user.is_active,
            is_owner: user.is_owner
        };
        const [accessToken, regreshToken] = await Promise.all([
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
            refresh_token: regreshToken
        };
    };
}
