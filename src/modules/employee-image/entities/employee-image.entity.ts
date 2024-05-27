import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employees } from 'src/modules/employee/entities/employee.entity';

@Entity()
export class EmployeeImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imagePath: string;

  @ManyToOne(() => Employees, employee => employee.images)
  @JoinColumn({ name: 'employeeId' })
  employee: Employees;
}
