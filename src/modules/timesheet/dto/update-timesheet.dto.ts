export class UpdateTimesheetDto {
  employeeId?: number;
  projectId?: number;
  date?: Date;
  clockInTime?: string;
  clockOutTime?: string;
  hoursWorked?: number; 
}
