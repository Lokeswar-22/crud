import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employees } from 'src/modules/employee/entities/employee.entity';
import { Project } from 'src/modules/project/entities/project.entity';

@Entity()
export class Timesheet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employees, employee => employee.timesheets, { eager: true })
  employee: Employees;

  @ManyToOne(() => Project, project => project.timesheets, { eager: true })
  project: Project;

  @Column('date')
  date: Date;

  @Column('time')
  clockInTime: string;

  @Column('time')
  clockOutTime: string;

  @Column('int')
  hoursWorked: number;
}
