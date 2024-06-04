import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employees } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Department } from '../department/entities/department.entity';
import { Project } from '../project/entities/project.entity';
import { EmployeeImage } from '../employee-image/entities/employee-image.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(EmployeeImage)
    private employeeImageRepository: Repository<EmployeeImage>
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employees> {
    const newEmployee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(newEmployee);
  }

  async findAll(): Promise<Employees[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: number): Promise<Employees> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employees> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.employeeRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }


  async findEmployeesByDepartment(departmentId: number): Promise<Employees[]> {
    const department = await this.departmentRepository.findOne(
      { where: { id: departmentId }, relations: ['employees'] }
    );
    if (!department) {
      throw new NotFoundException(`Department with ID ${departmentId} not found`);
    }
    return department.employees;
  }

  async findDepartmentByEmployee(employeeId: number): Promise<Department> {
    const employee = await this.employeeRepository.findOne(
      { where: { id: employeeId }, relations: ['department'] }
    );
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }
    return employee.department;
  }

  async findProjectsByEmployee(employeeId: number): Promise<Project[]> {
    const employee = await this.employeeRepository.findOne(
      { where: { id: employeeId }, relations: ['projects'] }
    );
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }
    return employee.projects;
  }
  /*
  async findProjectsByEmployee(employeeId: number): Promise<Project[]> {
  return await this.projectRepository.query(`
    SELECT p.id, p.name 
    FROM projects p 
    INNER JOIN employee_project ep ON p.id = ep.projectId 
    WHERE ep.employeeId = $1
  `, [employeeId]);
}

  */



  async findEmployeeWithImage(id: number): Promise<any> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    const employeeImage = await this.employeeImageRepository.findOne({
      where: { employee: employee },
    });
    return {
      ...employee,
      imagePath: employeeImage ? employeeImage.imagePath : null,
    };
  }
  
  async findEmployeeImagePath(id: number): Promise<string> {
    const employeeImage = await this.employeeImageRepository.findOne({
      where: { employee: { id: id } },
    });
    if (!employeeImage) {
      throw new Error(`Image for Employee with ID ${id} not found`);
    }
    return employeeImage.imagePath;
    
  }

  async findEmployeeImage(id: number): Promise<EmployeeImage> {
    return this.employeeImageRepository.findOne({
      where: { employee: { id: id } },
    });
  }
  async findOneWithImage(id: number): Promise<any> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    const employeeImage = await this.employeeImageRepository.findOne({
      where: { employee: employee },
    });

    return { ...employee, image: employeeImage?.imagePath };
  }






}