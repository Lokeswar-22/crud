import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { Timesheet } from './entities/timesheet.entity';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('timesheets')
@UseGuards(JwtAuthGuard)
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Post()
  async create(@Body() createTimesheetDto: CreateTimesheetDto): Promise<Timesheet> {
    return this.timesheetService.create(createTimesheetDto);
  }

  @Get()
  async findAll(): Promise<Timesheet[]> {
    return this.timesheetService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Timesheet> {
    return this.timesheetService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTimesheetDto: UpdateTimesheetDto): Promise<Timesheet> {
    return this.timesheetService.update(id, updateTimesheetDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.timesheetService.remove(id);
  }
}
