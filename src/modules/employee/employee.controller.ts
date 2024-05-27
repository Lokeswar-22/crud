import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employees } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeImage } from '../employee-image/entities/employee-image.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('employees')
@UseGuards(JwtAuthGuard)

export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employees> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  async findAll(): Promise<Employees[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    const employee = await this.employeeService.findOne(id);
    const department = await this.employeeService.findDepartmentByEmployee(id);
    const employeeImage = await this.employeeService.findEmployeeImage(id); 
    return { ...employee, department: department, image: employeeImage?.imagePath }; 
  }

  @Get(':id/employee-image')
  async findEmployeeImage(@Param('id') id: string): Promise<EmployeeImage> {
    return this.employeeService.findEmployeeImage(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employees> {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.employeeService.remove(+id);
  }
}
