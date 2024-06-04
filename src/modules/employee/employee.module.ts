import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employees } from './entities/employee.entity';
import { Department } from '../department/entities/department.entity';
import { Project } from '../project/entities/project.entity';
import { EmployeeImage } from '../employee-image/entities/employee-image.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Timesheet } from '../timesheet/entities/timesheet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employees, Department, Project, EmployeeImage, Timesheet]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService,

  ],
})
export class EmployeeModule {}
