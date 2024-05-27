import { IsString, IsDate, IsOptional, IsNumber, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dob?: Date;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  address?: string;
  
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  designation?: string;




  @IsNumber()
  @IsOptional()
  departmentId?: number;
}
