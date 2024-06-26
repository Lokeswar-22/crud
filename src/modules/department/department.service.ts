
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Employees } from '../employee/entities/employee.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const newDepartment = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(newDepartment);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    await this.departmentRepository.update(id, updateDepartmentDto);
    return this.departmentRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.departmentRepository.delete(id);
  }


  async findEmployeesByDepartment(departmentId: number): Promise<Employees[]> {
    return await this.employeeRepository.createQueryBuilder('employee')
      .innerJoin('employee.department', 'department')
      .where('department.id = :departmentId', { departmentId })
      .select(['employee.id', 'employee.name', 'employee.email'])
      .getMany();
    }

    /*
    async findEmployeesByDepartment(departmentId: number): Promise<Employees[]> {
      return await this.employeeRepository.query(`
        SELECT e.id, e.name, e.email 
        FROM employees e 
        INNER JOIN department d ON e.departmentId = d.id 
        WHERE d.id = $1
      `, [departmentId]);
    }
 */
}
