import { CreateBuilderDto } from './dto/create-builder.dto';
import { Builder } from './models/builder.module';
import { UpdateBuilderDto } from './dto/update-builder.dto';
export declare class BuilderService {
    private builderRepository;
    constructor(builderRepository: typeof Builder);
    createBuilder(createBuilderDto: CreateBuilderDto): Promise<Builder>;
    getAll(): Promise<Builder[]>;
    getOne(id: number): Promise<Builder>;
    deleteOne(id: number): Promise<number>;
    updateOne(id: number, updateBuilderDto: UpdateBuilderDto): Promise<[number, UpdateBuilderDto[]]>;
}
