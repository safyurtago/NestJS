import { Builder } from './models/builder.module';
import { BuilderService } from './builder.service';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';
export declare class BuilderController {
    private readonly builderService;
    constructor(builderService: BuilderService);
    createBuilder(createBuilderDto: CreateBuilderDto): Promise<Builder>;
    getAllBuilder(): Promise<Builder[]>;
    getOneBuilder(id: number): Promise<Builder>;
    deleteBuilder(id: number): Promise<number>;
    updateBuilder(id: number, updateBuilderDto: UpdateBuilderDto): Promise<[number, UpdateBuilderDto[]]>;
}
