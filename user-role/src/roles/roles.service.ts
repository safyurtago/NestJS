import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepo: typeof Role){}
  
  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepo.create(createRoleDto);
  }

  async findAll() {
    return await this.roleRepo.findAll({include: {all: true}});
  }

  async findOne(value: string) {
    return await this.roleRepo.findOne({where: { value }, include: {all: true}});
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.roleRepo.update(updateRoleDto, {where: {id}});
  }

  async remove(id: number) {
    return await this.roleRepo.destroy({where: { id }});
  }
}
