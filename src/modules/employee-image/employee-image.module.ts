import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeImageController } from './employee-image.controller';
import { EmployeeImageService } from './employee-image.service';
import { EmployeeImage } from './entities/employee-image.entity';
import { Employees } from '../employee/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeImage, Employees]),
  ],
  controllers: [EmployeeImageController],
  providers: [EmployeeImageService],
})
export class EmployeeImageModule {}
