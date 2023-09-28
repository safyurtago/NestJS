import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './models/role.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Role qoshish' })
  @ApiResponse({status: 201, description: 'Success', type: [Role]})
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Rolarni olish' })
  @ApiResponse({status: 201, description: 'Success', type: [Role]})
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({ summary: 'Rolarni olish' })
  @ApiResponse({status: 201, description: 'Success', type: [Role]})
  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.rolesService.findOne(value);
  }

  @ApiOperation({ summary: 'Rolni ozgartirish' })
  @ApiResponse({status: 201, description: 'Success', type: [Role]})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: 'Rolni ochirish' })
  @ApiResponse({status: 201, description: 'return 1'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
