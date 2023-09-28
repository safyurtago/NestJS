import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './models/company.model';

@Injectable()
export class CompanyService {
    constructor(@InjectModel(Company) private companyRepository: typeof Company) {}

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const company = await this.companyRepository.create(createCompanyDto)
        return company
    }

    async getAllCompany(): Promise<Company[]> {
        const allCompanies = await this.companyRepository.findAll({
            include: {all: true}
        });
        return allCompanies
    }

    async getOneCompany(id: number): Promise<Company> {
        const company = await this.companyRepository.findByPk(id, {include: {all: true}});
        return company
    }

    async updateCompany(id: number, updateCompanyDto: UpdateCompanyDto): Promise<[number, {}]> {
        return this.companyRepository.update(updateCompanyDto, {
            where: {id},
            returning: true,
        })
    }

    async deleteByPk(id: number): Promise<Number> {
        return this.companyRepository.destroy({where: {id}})
    }
}
