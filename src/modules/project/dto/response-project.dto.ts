import { Department } from "src/modules/department/entities/department.entity";
import { Employees } from "src/modules/employee/entities/employee.entity";
import { ResponseDepartmentDto } from "src/modules/department/dto/response-department.dto";
import { ResponseEmployeeDto } from "src/modules/employee/dto/response-employee.dto";

export class ProjectResponseDto {
  name: string;
  id: number;
  departments: ResponseDepartmentDto[];
  employees: ResponseEmployeeDto[];
}