import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateEmployeeImageDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  imagePath?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  employeeId?: number;
}
