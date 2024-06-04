import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Employees } from 'src/modules/employee/entities/employee.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Timesheet } from 'src/modules/timesheet/entities/timesheet.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @ManyToMany(() => Department, department => department.projects)
  @JoinTable({ name: 'project_department' }) 
  departments: Department[];
  

  @ManyToMany(() => Employees, employee => employee.projects)
  @JoinTable({
    name: 'employee_project',
    joinColumn: { name: 'projectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'employeeId', referencedColumnName: 'id' }
  })
  employees: Employees[];

  @OneToMany(() => Timesheet, timesheet => timesheet.project)
  timesheets: Timesheet[];

  
}