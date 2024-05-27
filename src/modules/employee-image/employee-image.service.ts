import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeImage } from './entities/employee-image.entity';
import { CreateEmployeeImageDto } from './dto/create-employee-image.dto';
import { UpdateEmployeeImageDto } from './dto/update-employee-image.dto';
import { Employees } from '../employee/entities/employee.entity';



@Injectable()
export class EmployeeImageService {
  constructor(
    @InjectRepository(EmployeeImage)
    private employeeImageRepository: Repository<EmployeeImage>,
    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,
  ) {}

  async create(createEmployeeImageDto: CreateEmployeeImageDto) {
    const { employeeId, imagePath } = createEmployeeImageDto;
    const employee = await this.employeeRepository.findOne(({ where: { id:employeeId } }));

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const employeeImage = this.employeeImageRepository.create({
      ...createEmployeeImageDto,
      employee,
    });

    return this.employeeImageRepository.save(employeeImage);
  }


  findAll() {
    return this.employeeImageRepository.find({ relations: ['employee'] });
  }

  findOne(id: number) {
    return this.employeeImageRepository.findOne({
        where: { id },
        relations: ['employee'],
      });
  }

  async update(id: number, updateEmployeeImageDto: UpdateEmployeeImageDto, imagePath?: string) {
    const employeeImage = await this.employeeImageRepository.findOne({
        where: { id: updateEmployeeImageDto.employeeId },
      });

    if (!employeeImage) {
      throw new NotFoundException('EmployeeImage not found');
    }

    if (updateEmployeeImageDto.employeeId) {
      const employee = await this.employeeRepository.findOne({
        where: { id: updateEmployeeImageDto.employeeId },
      });
      if (!employee) {
        throw new NotFoundException('Employee not found');
      }
      employeeImage.employee = employee;
    }

    if (imagePath) {
      employeeImage.imagePath = imagePath;
    }

    return this.employeeImageRepository.save(employeeImage);
  }

  async remove(id: number) {
    const employeeImage = await this.employeeImageRepository.findOne({ where: { id } });

    if (!employeeImage) {
      throw new NotFoundException('EmployeeImage not found');
    }

    return this.employeeImageRepository.remove(employeeImage);
  }
}
