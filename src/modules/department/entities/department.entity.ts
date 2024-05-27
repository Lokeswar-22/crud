import { Entity, PrimaryGeneratedColumn,ManyToMany, Column,JoinTable, OneToMany } from 'typeorm';
import { Employees } from 'src/modules/employee/entities/employee.entity';
import { Project } from 'src/modules/project/entities/project.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  manager: string; 
  @ManyToMany(() => Project, project => project.departments)
  @JoinTable({ name: 'department_project' }) 
  projects: Project[];


  @OneToMany(() => Employees, employee => employee.department)
  employees: Employees[];
 
}
