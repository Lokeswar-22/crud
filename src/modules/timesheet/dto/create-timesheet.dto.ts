export class CreateTimesheetDto {
    employeeId: number;
    projectId: number;
    date: Date;
    clockInTime: string;
    clockOutTime: string;
  }
  