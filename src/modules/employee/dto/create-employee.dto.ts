import { IsString, IsDate, IsNotEmpty, IsOptional, IsNumber, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  address: string;
  
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  designation: string;


  @IsNumber()
  @IsOptional()
  departmentId?: number;
}

