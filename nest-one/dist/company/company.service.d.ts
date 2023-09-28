import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './models/company.model';
export declare class CompanyService {
    private companyRepository;
    constructor(companyRepository: typeof Company);
    createCompany(createCompanyDto: CreateCompanyDto): Promise<Company>;
    getAllCompany(): Promise<Company[]>;
    getOneCompany(id: number): Promise<Company>;
    updateCompany(id: number, updateCompanyDto: UpdateCompanyDto): Promise<[number, {}]>;
    deleteByPk(id: number): Promise<Number>;
}
