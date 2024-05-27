import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeImageService } from './employee-image.service';

describe('EmployeeImageService', () => {
  let service: EmployeeImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeImageService],
    }).compile();

    service = module.get<EmployeeImageService>(EmployeeImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
