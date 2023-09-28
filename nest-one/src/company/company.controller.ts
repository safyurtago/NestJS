import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyService } from './company.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './models/company.model';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post("create")
    async createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
        const company = await this.companyService.createCompany(createCompanyDto);
        return company;
        // return this.companyService.createCompany(createCompanyDto);
    }

    @Get("getAll")
    async getAllCompany(): Promise<Company[]> {
        const allCompanies = await this.companyService.getAllCompany();
        return allCompanies
    }

    @Get("getOne/:id")
    async getOneCompany(@Param("id") id: number): Promise<Company> {
        const oneCompany = await this.companyService.getOneCompany(id);
        return oneCompany
    }

    @Put("update/:id")
    async updateCompany(@Param("id") id: number, @Body() updateCompanyDto: UpdateCompanyDto): Promise<[number, {}]> {
        return this.companyService.updateCompany(id, updateCompanyDto)
    }

    @Delete("delete/:id")
    async deleteCompany(@Param("id") id: number) {
        return this.companyService.deleteByPk(id)
    }

}
