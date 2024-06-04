import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Employees } from 'src/modules/employee/entities/employee.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { EmployeeImage } from 'src/modules/employee-image/entities/employee-image.entity';
import { User } from 'src/modules/users/user.entity';
import { Timesheet } from 'src/modules/timesheet/entities/timesheet.entity';
@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: 'localhost',
      username: 'qazi',
      password: 'qazwsxedc123',
      port: 1433,
      database: 'EMPDatabase',
      options: {
        trustServerCertificate: true,
      },
      entities: [Employees, Department, Project, EmployeeImage, User, Timesheet],
    };
  }
}
