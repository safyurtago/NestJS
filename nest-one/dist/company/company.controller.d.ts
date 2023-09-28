import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './models/company.model';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    createCompany(createCompanyDto: CreateCompanyDto): Promise<Company>;
    getAllCompany(): Promise<Company[]>;
    getOneCompany(id: number): Promise<Company>;
    updateCompany(id: number, updateCompanyDto: UpdateCompanyDto): Promise<[number, {}]>;
    deleteCompany(id: number): Promise<Number>;
}
