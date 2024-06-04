import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timesheet } from './entities/timesheet.entity';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';
import { Employees } from '../employee/entities/employee.entity';
import { Project } from '../project/entities/project.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Timesheet,Employees, Project])],
  controllers: [TimesheetController],
  providers: [TimesheetService],
})
export class TimesheetModule {}
