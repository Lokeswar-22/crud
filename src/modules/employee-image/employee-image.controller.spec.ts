import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeImageController } from './employee-image.controller';

describe('EmployeeImageController', () => {
  let controller: EmployeeImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeImageController],
    }).compile();

    controller = module.get<EmployeeImageController>(EmployeeImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
