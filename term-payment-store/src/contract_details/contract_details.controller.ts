import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContractDetailsService } from './contract_details.service';
import { CreateContractDetailDto } from './dto/create-contract_detail.dto';
import { UpdateContractDetailDto } from './dto/update-contract_detail.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContractDetail } from './models/contract_detail.model';
import { AdminGuard } from '../guards/admin.guard';



@ApiTags('contract-details')
@Controller('contract-details')
@UseGuards(AdminGuard)
export class ContractDetailsController {
  constructor(private readonly contractDetailsService: ContractDetailsService) {}

  @ApiOperation({summary: 'create contract details'})
  @ApiResponse({status: 201, type: ContractDetail})
  @Post()
  create(@Body() createContractDetailDto: CreateContractDetailDto) {
    return this.contractDetailsService.create(createContractDetailDto);
  }

  @ApiOperation({summary: 'find contract details'})
  @ApiResponse({status: 200, type: ContractDetail})
  @Get()
  findAll() {
    return this.contractDetailsService.findAll();
  }

  @ApiOperation({summary: 'find contract details'})
  @ApiResponse({status: 200, type: ContractDetail})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractDetailsService.findOne(+id);
  }

  @ApiOperation({summary: 'update contract details'})
  @ApiResponse({status: 200, type: ContractDetail})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDetailDto: UpdateContractDetailDto) {
    return this.contractDetailsService.update(+id, updateContractDetailDto);
  }

  @ApiOperation({summary: 'delete contract details'})
  @ApiResponse({status: 200, type: ContractDetail})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractDetailsService.remove(+id);
  }
}
