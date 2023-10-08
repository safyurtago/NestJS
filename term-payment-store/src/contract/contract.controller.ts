import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { AdminGuard } from '../guards/admin.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Contract } from './models/contract.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindContractDto } from './dto/find-contract.dto';

@ApiTags('contract')
@Controller('contract')
@UseGuards(AdminGuard)
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @ApiOperation({summary: 'Create a contract'})
  @ApiResponse({status: 201, type: Contract})
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createContractDto: CreateContractDto,
    @Req() req: Request,
    @UploadedFile() image: any,
  ) {
    return this.contractService.create(createContractDto, req, image);
  }

  @ApiOperation({summary: 'get contract'})
  @ApiResponse({status: 200, type: [Contract]})
  @Post('find')
  findAll(findContractDto: FindContractDto) {
    return this.contractService.findAll(findContractDto);
  }

  @ApiOperation({summary: 'get a contract'})
  @ApiResponse({status: 200, type: Contract})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @ApiOperation({summary: 'update a contract'})
  @ApiResponse({status: 200, type: Contract})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(+id, updateContractDto);
  }

  @ApiOperation({summary: 'delete a contract'})
  @ApiResponse({status: 200, type: Contract})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
