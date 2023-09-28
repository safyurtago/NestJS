import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import {v4} from 'uuid';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class UsersService {
    // Constructor
    constructor (
        @InjectModel(User) private readonly userRopository: typeof User,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailService
    ) {}

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
            user: updatedUser
        }

        return response
    }


    async login () {}





    
    findAllUsers () {
        return this.userRopository.findAll({include: {all: true}})
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
