import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Department } from 'src/modules/department/entities/department.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { EmployeeImage } from 'src/modules/employee-image/entities/employee-image.entity';

@Entity()
export class Employees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dob: Date;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  designation: string;
  
  @OneToMany(() => EmployeeImage, image => image.employee)
  images: EmployeeImage[];

  @ManyToOne(() => Department, department => department.employees, { nullable: true })
  department: Department;

  @ManyToMany(() => Project, project => project.employees)

  projects: Project[];

}
