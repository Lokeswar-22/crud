import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsOptional()
  employeeIds?: number[];
}
