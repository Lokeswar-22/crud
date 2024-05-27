import { Department } from "src/modules/department/entities/department.entity";
import { Employees } from "src/modules/employee/entities/employee.entity";

export class ProjectResponseDto {
  name: string;
  id: number;
  departments: Department[];
  employees: Employees[];
}
