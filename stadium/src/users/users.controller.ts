import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {Response} from 'express'

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: 'register User'})
    @ApiResponse({status: 201, type: User})
    @Post('signup')
    registration (
        @Body() createUserDto: CreateUserDto,
        @Res({passthrough: true}) res: Response
    ) {
        return this.usersService.registration(createUserDto, res)
    }

    @ApiOperation({summary: 'activate User'})
    @ApiResponse({status: 200, type: [User]})
    @Get('activate/:link')
    activate (@Param('link') link: string) {
        return this.usersService.activate(link)
    }

    @ApiOperation({summary: 'login User'})
    @ApiResponse({status: 200, type: User})
    @Post('signin')
    login (

    ) {}
    
    @ApiOperation({summary: 'Get All Users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    findAllUsers () {
        return this.usersService.findAllUsers();
    }

    @ApiOperation({summary: 'Get User By ID'})
    @ApiResponse({status: 200, type: [User]})
    @Get(':id')
    findUser (@Param('id') id: string) {
        return this.usersService.findUser(+id);
    }


    @ApiOperation({summary: 'Get All Users'})
    @ApiResponse({status: 200, type: [User]})
    @Delete()
    deleteUser (@Param('id') id: number) {
        return this.usersService.deleteUser(id);
    }

    @ApiOperation({summary: 'Update User'})
    @ApiResponse({status: 200, type: [User]})
    @Patch()
    updateUser () {}


}
