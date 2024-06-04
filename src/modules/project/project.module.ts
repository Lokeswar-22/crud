import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { Department } from '../department/entities/department.entity';
import { Employees } from '../employee/entities/employee.entity';
import { Timesheet } from '../timesheet/entities/timesheet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Department, Employees, Timesheet]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
