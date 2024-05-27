
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectResponseDto } from './dto/response-project.dto';
import { Department } from '../department/entities/department.entity';
import { Employees } from '../employee/entities/employee.entity';
import { In } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(newProject);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    await this.projectRepository.update(id, updateProjectDto);
    return this.projectRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async getProjectDetailsByName(name: string): Promise<ProjectResponseDto> {
    const project = await this.projectRepository.findOne({ where: { name }, relations: ['departments', 'employees'] });
    if (!project) {
      throw new NotFoundException(`Project with name ${name} not found`);
    }

    const departmentsIds = project.departments.map(department => department.id);
    const departments = await this.departmentRepository.find({
      where: { id: In(departmentsIds) },
      select: ['name'],
    });
    
    const employeesIds = project.employees.map(employee => employee.id);
const employees = await this.employeeRepository.find({
  where: { id: In(employeesIds) },
  select: ['name','email','designation'],
});


    const { id } = project;
    return { id, name, departments, employees };
  }
}


