
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
    const project = await this.projectRepository.createQueryBuilder('project')
      .where('project.name = :name', { name })
      .leftJoinAndSelect('project.departments', 'department')
      .leftJoinAndSelect('project.employees', 'employee')
      .getOne();
  
    if (!project) {
      throw new NotFoundException(`Project with name ${name} not found`);
    }
  
    const { id, departments, employees } = project;
    return {
      id,
      name,
      departments: departments.map(dept => ({ id: dept.id, name: dept.name })),
      employees: employees.map(emp => ({ id: emp.id, name: emp.name, email: emp.email, designation: emp.designation }))
    };
  }
  /*
  async getProjectDetailsByName(name: string): Promise<ProjectResponseDto> {
  const project = await this.projectRepository.query(`
    SELECT p.id, p.name, 
           d.id as department_id, d.name as department_name, 
           e.id as employee_id, e.name as employee_name, e.email as employee_email, e.designation as employee_designation 
    FROM projects p 
    LEFT JOIN project_department pd ON p.id = pd.projectId 
    LEFT JOIN department d ON pd.departmentId = d.id 
    LEFT JOIN employee_project ep ON p.id = ep.projectId 
    LEFT JOIN employees e ON ep.employeeId = e.id 
    WHERE p.name = $1
  `, [name]);

  if (!project || project.length === 0) {
    throw new NotFoundException(`Project with name ${name} not found`);
  }

  const { id } = project[0];
  const departments = project.map(proj => ({ id: proj.department_id, name: proj.department_name }));
  const employees = project.map(proj => ({ id: proj.employee_id, name: proj.employee_name, email: proj.employee_email, designation: proj.employee_designation }));

  return { id, name, departments, employees };
}

  */
  
}


