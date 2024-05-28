import { Controller, Get, Post, Body, Param, Put, Delete,UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { EmployeeImageService } from './employee-image.service';
import { CreateEmployeeImageDto } from './dto/create-employee-image.dto';
import { UpdateEmployeeImageDto } from './dto/update-employee-image.dto';
import { EmployeeImage } from './entities/employee-image.entity';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';



@Controller('employee-images')
@UseGuards(JwtAuthGuard)

export class EmployeeImageController {
  constructor(private readonly employeeImageService: EmployeeImageService) {}

  @Post()
  create(@Body() createEmployeeImageDto: CreateEmployeeImageDto) {
    return this.employeeImageService.create(createEmployeeImageDto);
  }
  @Get()
  findAll() {
    return this.employeeImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeeImageService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      }
    })
  }))
  update(
    @Param('id') id: number,
    @Body() updateEmployeeImageDto: UpdateEmployeeImageDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.employeeImageService.update(+id, updateEmployeeImageDto, image?.path);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.employeeImageService.remove(+id);
  }
}
