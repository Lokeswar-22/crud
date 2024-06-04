import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { DepartmentModule } from './modules/department/department.module';
import { ProjectModule } from './modules/project/project.module';
import { EmployeeImageModule } from './modules/employee-image/employee-image.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { TimesheetModule } from './modules/timesheet/timesheet.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    EmployeeModule,
    DepartmentModule,
    ProjectModule,
    EmployeeImageModule,
    AuthModule,
    TimesheetModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
