import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timesheet } from './entities/timesheet.entity';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { Employees } from '../employee/entities/employee.entity';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectRepository(Timesheet)
    private timesheetRepository: Repository<Timesheet>,
    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createTimesheetDto: CreateTimesheetDto): Promise<Timesheet> {
    const { clockInTime, clockOutTime } = createTimesheetDto;
    const hoursWorked = this.calculateWorkingHours(clockInTime, clockOutTime);

    const employee = await this.employeeRepository.findOne({ where: { id: createTimesheetDto.employeeId } });
    const project = await this.projectRepository.findOne({ where: { id: createTimesheetDto.projectId } });

    if (!employee || !project) {
      throw new NotFoundException('Employee or Project not found');
    }

    const timesheet = this.timesheetRepository.create({
      ...createTimesheetDto,
      hoursWorked,
      employee,
      project,
    });

    return this.timesheetRepository.save(timesheet);
  }

  async findAll(): Promise<Timesheet[]> {
    return this.timesheetRepository.find({
      relations: ['employee', 'project'],
    });
  }

  async findOne(id: number): Promise<Timesheet> {
    const timesheet = await this.timesheetRepository.findOne({
      where: { id },
      relations: ['employee', 'project'],
    });
    if (!timesheet) {
      throw new NotFoundException(`Timesheet with ID ${id} not found`);
    }
    return timesheet;
  }

  async update(id: number, updateTimesheetDto: UpdateTimesheetDto): Promise<Timesheet> {
    const { clockInTime, clockOutTime } = updateTimesheetDto;
    const hoursWorked = this.calculateWorkingHours(clockInTime, clockOutTime);

    const employee = await this.employeeRepository.findOne({ where: { id: updateTimesheetDto.employeeId } });
    const project = await this.projectRepository.findOne({ where: { id: updateTimesheetDto.projectId } });

    if (!employee || !project) {
      throw new NotFoundException('Employee or Project not found');
    }

    await this.timesheetRepository.update(id, {
      ...updateTimesheetDto,
      hoursWorked,
      employee,
      project,
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.timesheetRepository.delete(id);
  }

  calculateWorkingHours(clockInTime: string, clockOutTime: string): number {
    const clockIn = new Date(`1970-01-01T${clockInTime}Z`);
    const clockOut = new Date(`1970-01-01T${clockOutTime}Z`);
    const diff = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60);
    return diff;
  }
}
