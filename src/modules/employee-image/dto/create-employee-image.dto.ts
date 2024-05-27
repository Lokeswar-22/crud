import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeImageDto {
    @IsString()
    @IsNotEmpty()
    imagePath: string;
  
    @IsNumber()
    @IsNotEmpty()
    employeeId: number;
  }