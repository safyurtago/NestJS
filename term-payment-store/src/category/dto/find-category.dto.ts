import { IsOptional, IsString } from "class-validator";

export class FindCategoryDto {
    @IsOptional()
    @IsString()
    name: string;
}